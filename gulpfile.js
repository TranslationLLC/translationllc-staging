var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    path = require('path'),
    rename = require('gulp-rename'),
    handlebars = require('gulp-compile-handlebars'),
    tap = require('gulp-tap'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    htmlMinify = require('gulp-htmlmin'),
    exec = require('child_process').exec;

gulp.task('compileMobileCss', function() {
  return gulp.src('public/css/*.mobile.css')
  .pipe(cleanCss({debug: true}), function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  })
  .pipe(concat('bundle.mobile.css'))
  .pipe(gulp.dest('public/dist'));
});
gulp.task('compileDesktopCss', function() {
  return gulp.src(['public/css/*.mobile.css', 'public/css/*.desktop.css'])
  .pipe(cleanCss({debug: true}), function(details) {
    console.log(details.name + ': ' + details.stats.originalSize);
    console.log(details.name + ': ' + details.stats.minifiedSize);
  })
  .pipe(concat('bundle.desktop.css'))
  .pipe(gulp.dest('public/dist'));
});
gulp.task('compileEnv', function() {
  exec('bash ./bin/env.sh > ./public/js/utils/env.js');
});
gulp.task('compileJs', function() {
  var apps = [
    './public/js/apps/homepage.js',
    './public/js/apps/people.js'
  ];
  var tasks = apps.map(function(entry) {
    return browserify({entries: [entry]})
    .transform('babelify', {presets: ['es2015']})
    .bundle()
    .pipe(vinylSourceStream(entry))
    .pipe(vinylBuffer())
    .pipe(uglify())
    .pipe(rename({
      extname: '.bundle.js'
    }))
    .pipe(gulp.dest(function(vinyl) {
      var pathArray = entry.split('/'),
          filename = pathArray[pathArray.length - 1].split('.')[0];
      vinyl.path = __dirname;
      return __dirname + '/public/dist/apps/' + filename + '.bundle.js';
    }));
  });
});
gulp.task('compileHandlebars', function() {
  var data = {};
  return gulp.src(['./templates/partials/header.handlebars', './templates/partials/homepageScripts.handlebars', './templates/partials/homepage.handlebars'])
  .pipe(tap(function(file, t) {
    var pathBasename = path.basename(file.path);
    if (pathBasename.indexOf('header') > -1) {
      data['header'] = file.contents.toString();
    } else if (pathBasename.indexOf('homepageScripts') > -1) {
      data['homepageScripts'] = file.contents.toString();
    } else if (pathBasename.indexOf('homepage') > -1) {
      data['body'] = file.contents.toString().replace('{{> header}}', data['header']).replace('{{> homepageScripts}}', data['homepageScripts']);
    }
    if (data.body) {
      // var minifiedHtml = htmlMinify(data.body, {collapseWhitespace: true, removeComments: true});
      return gulp.src('./templates/layouts/main.handlebars')
      .pipe(handlebars(data))
      .pipe(htmlMinify({
        collapseWhitespace: true
      }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('public/dist/html'))
    }
  }));
});
gulp.task('default', ['compileMobileCss', 'compileDesktopCss', 'compileJs', 'compileEnv', 'compileHandlebars']);

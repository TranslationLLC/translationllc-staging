var gulp = require('gulp'),
    cleanCss = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    vinylSourceStream = require('vinyl-source-stream'),
    vinylBuffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    path = require('path'),
    rename = require('gulp-rename'),
    minify = require('gulp-minify'),
    uglify = require('gulp-uglify'),
    htmlMinify = require('html-minifier').minify,
    content = require('./views/content.js'),
    hbs = require('express-handlebars').create(),
    fs = require('fs'),
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
  hbs.render('./views/layouts/main.handlebars', {body: '__body__'}).then(function(data) {
    hbs.render('./views/homepage.handlebars', content).then(function(homepageData) {
      fs.writeFile('./public/dist/html/index.html', htmlMinify(data.replace('__body__', homepageData), {collapseWhitespace: true}), function(err) {
        if (!err) {
          console.log('index.html file compiled');
        } else {
          console.log('error compiling index.html ', err);
        }
      });
    });
  });
});
gulp.task('default', ['compileMobileCss', 'compileDesktopCss', 'compileJs', 'compileHandlebars']);

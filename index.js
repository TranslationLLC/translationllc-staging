var express = require('express'),
    app = express(),
    expresshbs = require('express-handlebars'),
    hbs = expresshbs.create(),
    hbsInstance = expresshbs({defaultLayout: 'main'}),
    content = require('./views/content.js');
app.engine('handlebars', hbsInstance);
app.set('view engine', 'handlebars');
app.use('/dist', express.static(process.cwd() + '/public/dist'));
app.use('/assets', express.static(process.cwd() + '/public/assets'));
app.use('/css', express.static(process.cwd() + '/public/css'));
app.use('/fonts', express.static(process.cwd() + '/public/fonts'));
app.get('/', function(req, res) {
  res.render('homepage', content);
});
app.listen(process.env.PORT || 3000, function(req, res) {
  console.log('app started');
});

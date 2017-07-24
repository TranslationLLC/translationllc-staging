var keystone = require('keystone'),
    hbs = require('express-handlebars'),
    socket = require('socket.io'),
    rtm,
    env = require('./public/js/utils/env.js'),
    conditionalIf = require('./lib/handlebarsHelpers/conditionalIf.js'),
    handlebarsConfig = {
      defaultLayout: 'main',
      layoutsDir: 'templates/layouts',
      partialsDir: 'templates/partials',
      helpers: {
        conditionalIf: conditionalIf
      }
    };
keystone.init({
  'name': 'TranslationLLC',
  'brand': 'TranslationLLC',
  'static': ['public'],
  'views': 'templates/partials',
  'custom engine': hbs(handlebarsConfig),
  'view engine': 'handlebars',
  'auto update': true,
  'mongo': env.TRANSLATION_MONGODB_URI,
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': env.TRANSLATION_KEYSTONE_COOKIE_SECRET
});
require('./models');
keystone.set('routes', require('./routes'));
keystone.set('nav', {
  'pages': ['Homepage'],
  'components': ['CarouselComponent', 'SlideComponent', 'VideoComponent', 'ImageTextComponent']
});
keystone.start();

var keystone = require('keystone'),
    middleware = require('./middleware'),
    favicon = require('serve-favicon'),
    importRoutes = keystone.importer(__dirname),
    routes = {
      views: importRoutes('./views'),
      api: importRoutes('./api')
    };
console.log('pwd ', process.cwd());
keystone.pre('routes', favicon(process.cwd() + '/public/assets/favicon.ico'));

module.exports = function(app) {
  app.get('/', routes.views.homepage);
  app.get('/api/section', routes.api.section);
}

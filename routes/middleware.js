var keystone = require('keystone');
exports.initLocals = function(req, res, next) {
  var locals = res.locals;
  locals.user = req.user;
  next();
};
exports.initErrorHandlers = function(req, res, next) {
  res.err = function(err, title, message) {
    res.status(500).render('errors/500', {
      err: err,
      errorTitle: title,
      errorMsg: message
    });
  }
  res.notFound = function(title, message) {
    res.status(404).render('errors/404', {
      errorTitle: title,
      errorMsg: message
    });
  }
  next();
};
exports.flashMessages = function(req, res, next) {
  var flashMessages = {
    info: req.flash('info'),
    success: req.flash('success'),
    warning: req.flash('warning'),
    error: req.flash('error')
  };

  console.log('flashMessages ', flashMessages);

  res.locals.messages = false;

  next();
};

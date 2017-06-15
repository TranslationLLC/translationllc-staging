var keystone = require('keystone'),
    User = keystone.list('User');
module.exports = function checkIsAdmin(slackUserId, callback) {
  User.model.findOne({slackUserId: slackUserId})
    .exec()
    .then(function(user) {
      callback(user.canAccessKeystone);
    });
}

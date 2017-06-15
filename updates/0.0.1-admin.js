var keystone = require('keystone'),
    User = keystone.list('User');

module.exports = function(done) {
  new User.model({
    name: {first: 'Robert', last: 'Cunningham'},
    email: 'rob.cunningham@translationllc.com',
    password: 'admin',
    canAccessKeystone: true
  }).save(done);
}

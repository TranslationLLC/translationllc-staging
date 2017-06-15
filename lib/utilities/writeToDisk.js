var fs = require('fs');
module.exports = function writeToDisk(path, buffer, callback) {
  fs.writeFile(path, buffer, callback);
}

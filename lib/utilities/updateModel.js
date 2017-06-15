var keystone = require('keystone'),
    keystoneModel;
module.exports = function updateModel (keystoneList, searchParameter, searchValue, modelUpdateData) {
  // console.log('modelUpdateData ', modelUpdateData);
  // console.log('arguments ', arguments);
  var query = {};
  query[arguments[1]] = searchValue;
  if (modelUpdateData.component) {
    delete modelUpdateData.component;
  }
  keystoneModel = keystone.list(keystoneList).model;
  keystoneModel.findOneAndUpdate(query, modelUpdateData, {new: true, upsert: true}, function(err, result) {
    if (!err) {
      console.log('result ', result);
    } else {
      console.log('err ', err);
    }
  });
}

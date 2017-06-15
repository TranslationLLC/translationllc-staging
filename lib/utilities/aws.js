var AWS = require('aws-sdk'),
    request = require('request'),
    updateModel = require('./updateModel.js'),
    config = new AWS.Config({
      accessKeyId: process.env.TRANSLATION_AWS_ACCESS_KEY,
      secretAccessKey: process.env.TRANSLATION_AWS_SECRET_KEY,
      region: 'us-east-1'
    }),
    s3Params,
    base64,
    keystoneModel,
    s3Obj = new AWS.S3(config);
module.exports = function aws(file, fileName, fileType, bucketPath, keystoneList, slackData, fileData) {
  s3Params = {
    Bucket: process.env.TRANSLATION_S3_BUCKET + bucketPath,
    Key: fileName,
    Expires: 60,
    Body: file,
    ContentType: fileType,
    ACL: 'public-read'
  };
  s3Obj.putObject(s3Params, function(err, data) {
    // console.log('data ', data);
    // console.log('err ', err);
    //broadcast url to socket, save to database
    // updateModel(keystoneList, );
    if (keystoneList === 'People') {
      updateModel(keystoneList, 'slackUserId', slackData.id, fileData);
    }
  });
}

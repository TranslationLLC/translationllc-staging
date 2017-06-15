var request = require('request'),
    slackApiUrl = 'https://slack.com/api/files.info?token=' + process.env.SLACK_CMS_API_TOKEN + '&file=',
    aws = require('./aws.js'),
    cmsGroupId = 'G4BM33C4U',
    sendMessage = require('../translationllc_cms_bot/sendMessage.js'),
    updateModel = require('./updateModel.js'),
    writeToDisk = require('./writeToDisk.js');
module.exports = function getFileInfo(file, user, isAdmin) {
  request(slackApiUrl + file.file_id, function(error, response, body) {
    var parsedBody = JSON.parse(body),
        bucketPath,
        keystoneList,
        options = {
          headers: {
            'Authorization': 'Bearer ' + process.env.SLACK_CMS_API_TOKEN
          },
          url: parsedBody.file.url_private,
          encoding: null,
          method: 'GET'
        },
        fileData = {
          image: {
            filename: parsedBody.file.name,
            mimetype: parsedBody.file.mimetype,
            size: parsedBody.file.size,
          }
        };
    request(options, function(error, response, body) {
      // console.log('response headers ', response.headers);
      // console.log('error ', error);
      // console.log('parsedBody ', parsedBody);
      // console.log('user ', user);
      // console.log('fileDataObj ', fileDataObj);
      // console.log('body ', body);
      // aws(body, parsedBody.file.name, parsedBody.file.mimetype, bucketPath, keystoneList, user, fileDataObj);
      if (!isAdmin) {
        writeToDisk('public/images/profilePictures/' + parsedBody.file.name, body, function(err) {
          if (err) {
            console.log('err ', err);
          } else {
            //send notification through slack that update was made;
          }
        });
      } else {
        // console.log('parsedBody.file ', parsedBody.file);
        var initialComment = parsedBody.file.initial_comment;
        if (initialComment && initialComment.comment) {
          writeToDisk('public/images/' + initialComment.comment + '/' + parsedBody.file.name, body, function(err) {
            if(err) {
              console.log('err ', err);
            } else {
              if (initialComment.comment === 'profilePictures') {
                updateModel('People', 'slackUserId', user.id, fileData);
              }
              sendMessage(cmsGroupId, parsedBody.file.name + ' saved.');
            }
          });
        } else {
          sendMessage(cmsGroupId, 'Please supply path directory as a file comment.');
          //send notification that path to directory is not supplied.
        }
      }
    });
  });
};

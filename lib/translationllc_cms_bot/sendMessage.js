var request = require('request'),
    slackApiUrl = 'https://slack.com/api/chat.postMessage?token=' + process.env.SLACK_CMS_API_TOKEN;
module.exports = function sendMessage(id, text) {
  request.get(slackApiUrl + '&channel=' + id + '&text=' + text)
    .on('response', function(response) {
      // console.log('response ', response);
    });
}

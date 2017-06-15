var RTMClient = require('@slack/client').RtmClient,
    CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS,
    botToken = process.env.SLACK_CMS_API_TOKEN,
    RTM_EVENTS = require('@slack/client').RTM_EVENTS,
    MemoryDataStore = require('@slack/client').MemoryDataStore,
    getFileInfo = require('../utilities/getFileInfo.js'),
    checkIsAdmin = require('../utilities/checkIsAdmin.js'),
    rtm = new RTMClient(botToken, {dataStore: new MemoryDataStore()}),
    user;
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, function(rtmStartData) {
  // console.log('rtmStartData ', rtmStartData);
  console.log('Logged in as ' + rtmStartData.self.name + ' of team ' + rtmStartData.team.name);
  // console.log('RTM_EVENTS ', RTM_EVENTS);
});
rtm.on(RTM_EVENTS.MESSAGE, function handleRtmMessage(message) {
  user = rtm.dataStore.getUserById(message.user);
});
rtm.on(RTM_EVENTS.FILE_SHARED, function handleCreatedFile(file) {
  checkIsAdmin(file.user_id, function(isAdmin) {
    user = rtm.dataStore.getUserById(file.user_id);
    getFileInfo(file, user, isAdmin);
  });
});
module.exports = rtm;

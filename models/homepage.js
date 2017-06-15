var keystone = require('keystone'),
    Types = keystone.Field.Types,
    Homepage = new keystone.List('Homepage', {label: 'Homepage', plural: 'Homepage', singular: 'Hompage', track: true}),
    filename = require('../lib/utilities/filename.js'),
    storage = new keystone.Storage({
      adapter: require('keystone-storage-adapter-s3'),
      s3: {
        key: process.env.TRANSLATION_AWS_ACCESS_KEY,
        secret: process.env.TRANSLATION_AWS_SECRET_KEY,
        bucket: 'translation-bucket',
        path: '/homepageImages',
        headers: {
          'x-amz-acl': 'public-read'
        }
      }
    });;

Homepage.add({
  components: {type: Types.Relationship, ref: 'BaseComponent', many: true, initial: true}
});

Homepage.register();

var keystone = require('keystone'),
    Types = keystone.Field.Types,
    SlideComponent = new keystone.List('SlideComponent', {
      label: 'SlideComponent',
      plural: 'SlideComponents',
      singular: 'SlideComponent',
      track: true,
      map: {
        name: 'slideName'
      }
    }),
    filename = require('../lib/utilities/filename.js'),
    storage = new keystone.Storage({
      adapter: require('keystone-storage-adapter-s3'),
      s3: {
        key: process.env.TRANSLATION_AWS_ACCESS_KEY,
        secret: process.env.TRANSLATION_AWS_SECRET_KEY,
        bucket: 'translation-bucket',
        path: '/slideImages',
        headers: {
          'x-amz-acl': 'public-read'
        }
      }
    });

SlideComponent.add({
  slideName: {type: String, required: true},
  image: {type: Types.File, storage: storage, initial: true},
  textContent: {type: Types.Text, initial: true}
});

SlideComponent.register();

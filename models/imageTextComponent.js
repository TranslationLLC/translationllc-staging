var keystone = require('keystone'),
    Types = keystone.Field.Types,
    BaseComponent = require('./baseComponent.js').getBaseComponentList(),
    ImageTextComponent = new keystone.List('ImageTextComponent', {
      inherits: BaseComponent,
      label: 'ImageTextComponent',
      plural: 'ImageTextComponent',
      singular: 'ImageTextComponent',
      track: true,
    }),
    filename = require('../lib/utilities/filename.js'),
    storage = new keystone.Storage({
      adapter: require('keystone-storage-adapter-s3'),
      s3: {
        key: process.env.TRANSLATION_AWS_ACCESS_KEY,
        secret: process.env.TRANSLATION_AWS_SECRET_KEY,
        bucket: 'translation-bucket',
        path: '/imageTextImages',
        headers: {
          'x-amz-acl': 'public-read'
        }
      }
    });
ImageTextComponent.add({
  name: {type: String, required: true},
  header: {type: Types.Html, initial: true, height: '50px'},
  content: {type: Types.Html, initial: true, height: '100px'},
  backgroundImage: {type: Types.File, storage: storage, initial: true},
  componentType: {type: String, noedit: true, default: 'imageText', hidden: true},
  contentStyles: {type: Types.Code, height: 180, language: 'css'},
  backgroundImageStyles: {type: Types.Code, height: 180, language: 'css'},
  bottomImagePath: {type: Types.Text, initial: true}
});

ImageTextComponent.register();

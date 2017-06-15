var keystone = require('keystone'),
    BaseComponent = require('./baseComponent').getBaseComponentList(),
    Types = keystone.Field.Types,
    VideoComponent = new keystone.List('VideoComponent', {
      inherits: BaseComponent,
      label: 'VideoComponent',
      plural: 'VideoComponents',
      singular: 'VideoComponent',
      track: true,
      map: {
        name: 'name'
      }
    });

VideoComponent.add({
  name: {type: String, required: true},
  url: {type: Types.Url, initial: true},
  content: {type: Types.Text, initial: true},
  header: {type: Types.Text, initial: true},
  svgOverlay: {type: Types.Text, initial: true},
  videoContainerHeight: {type: Types.Text, initial: true},
  componentType: {type: String, noedit: true, default: 'video', hidden: true}
});

VideoComponent.register();

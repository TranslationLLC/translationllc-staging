var keystone = require('keystone'),
    Types = keystone.Field.Types,
    BaseComponent = require('./baseComponent.js').getBaseComponentList(),
    CarouselComponent = new keystone.List('CarouselComponent', {
      inherits: BaseComponent,
      label: 'CarouselComponent',
      plural: 'CarouselComponents',
      singular: 'CarouselComponent',
      track: true,
      drilldown: 'slides'
    });
CarouselComponent.add({
  name: {type: String, required: true},
  slides: {type: Types.Relationship, ref: 'SlideComponent', many: true, initial: true, wysiwg: true},
  header: {type: Types.Text, initial: true},
  content: {type: Types.Textarea, initial: true},
  componentType: {type: String, noedit: true, default: 'carousel', hidden: true}
});

CarouselComponent.register();

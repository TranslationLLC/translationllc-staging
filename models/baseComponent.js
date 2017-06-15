var keystone = require('keystone'),
    isRegistered = false,
    Types = keystone.Field.Types,
    BaseComponent;
module.exports = (function() {
  return {
    getBaseComponentList: function() {
      if (!isRegistered) {
        BaseComponent = new keystone.List('BaseComponent', {
          map: {
            name: 'name'
          }
        });
        BaseComponent.add({
          name: {type: String, required: true},
          anchorSection: {type: Types.Text, initial: true},
          componentOrderNumber: {type: Types.Number, initial: true}
        });
        BaseComponent.register();
        isRegistered = true;
        return BaseComponent;
      } else {
        return BaseComponent;
      }
    }
  }
})();

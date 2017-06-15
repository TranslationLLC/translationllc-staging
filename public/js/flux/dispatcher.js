const Dispatcher = (() => {
  let dispatcher;
  class Dispatcher {
    constructor() {
      this.stores = {};
    }

    registerStore(storeName, store, callback) {
      this.stores[storeName] = {
        store: store,
        callback: callback
      };
    }

    receiveAction(action, data) {
      for (let storeName in this.stores) {
        this.stores[storeName].callback.call(this.stores[storeName].store, action, data);
      }
    }
  }

  return {
    getInstance: function() {
      if (!dispatcher) {
        dispatcher = new Dispatcher();
        dispatcher.constructor = null;
      }
      return dispatcher;
    }
  }
})();

export { Dispatcher }

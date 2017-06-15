import { EventEmitter } from 'events';

class StoreEventEmitter extends EventEmitter {}

const EventBus = (() => {

  let eventBus;

  class EventBus {
    constructor() {
      this.emitter = new StoreEventEmitter();
    }

    emitChange(eventName, eventData) {
      this.emitter.emit(eventName, eventData);
    }

    removeChangeListener(eventName, callback) {
      this.emitter.removeListener(eventName, callback);
    }

    addChangeListener(eventName, callback) {
      this.emitter.on(eventName, callback);
    }
  }

  return {
    getInstance: function() {
      if (!eventBus) {
        eventBus = new EventBus();
        eventBus.constructor = null;
      }
      return eventBus;
    }
  }
})();

export { EventBus }

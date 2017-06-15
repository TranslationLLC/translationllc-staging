import { Dispatcher } from '../dispatcher'
import { EventBus } from '../eventBus'
let dispatcher = Dispatcher.getInstance();
class WindowActionsStore {
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  dispatcherCallback(action, data) {
    if (action === 'signal-scroll') {
      this.eventBus.emitChange('signalScroll', data);
    } else if (action === 'end-animation') {
      this.eventBus.emitChange('endAnimation');
    } else if (action === 'signal-touchmove') {
      this.eventBus.emitChange('signalTouchmove', data);
    } else if (action === 'signal-detection') {
      this.eventBus.emitChange('signalDetection', data);
    } else if (action === 'resize') {
      this.eventBus.emitChange('resize', data);
    }
  }
}
const windowActionsStore = new WindowActionsStore();
dispatcher.registerStore('windowActionsStore', windowActionsStore, windowActionsStore.dispatcherCallback);
export { windowActionsStore };

import { Dispatcher } from '../dispatcher'
import { EventBus } from '../eventBus'
let dispatcher = Dispatcher.getInstance();
class DeviceActionsStore {
  constructor() {
    this.eventBus = EventBus.getInstance();
  }
  dispatcherCallback(action, data) {
    if (action === 'orientation-change') {
      this.eventBus.emitChange('orientationChange', data);
    } else if (action === 'fullscreen-change') {
      this.eventBus.emitChange('fullscreenChange');
    } else if (action === 'video-played') {
      this.eventBus.emitChange('videoPlayed');
    } 
  }
}
const deviceActionsStore = new DeviceActionsStore();
dispatcher.registerStore('deviceActionsStore', deviceActionsStore, deviceActionsStore.dispatcherCallback);
export { deviceActionsStore };

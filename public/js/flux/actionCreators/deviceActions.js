import { Dispatcher } from '../dispatcher'
let dispatcher = Dispatcher.getInstance();
export const DeviceActions = (() => {
  return {
    orientationChange(data) {
      dispatcher.receiveAction('orientation-change', data);
    },
    fullScreenChange() {
      dispatcher.receiveAction('fullscreen-change');
    },
    videoPlayed() {
      dispatcher.receiveAction('video-played');
    },
    keydown(keyCode) {
      dispatcher.receiveAction('keydown', keyCode);
    }
  }
})();

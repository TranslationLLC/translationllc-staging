import { Dispatcher } from '../dispatcher'
let dispatcher = Dispatcher.getInstance();
export const WindowActions = (() => {
  return {
    signalScroll(data) {
      dispatcher.receiveAction('signal-scroll', data);
    },
    endAnimation() {
      dispatcher.receiveAction('end-animation');
    },
    signalTouchmove(data) {
      dispatcher.receiveAction('signal-touchmove', data);
    },
    signalDetection(data) {
      dispatcher.receiveAction('signal-detection', data);
    },
    resize(data) {
      dispatcher.receiveAction('resize', data);
    }
  }
})();

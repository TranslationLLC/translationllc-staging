import { WindowActions } from '../flux/actionCreators/windowActions'
import { EventBus } from '../flux/eventBus'
import { debounce } from '../utils/debounce'
class ResizeComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.__bindFlux();
  }
  __bindDOMEvents() {
    let debouncedRequestAnimationFrame = debounce(window.requestAnimationFrame, 500);
    window.addEventListener('resize', (evt) => {
      debouncedRequestAnimationFrame(() => {
        console.log('resize');
        WindowActions.resize(evt);
      });
    });
  }
  __detection(data) {
    if (data.isDesktop) {
      this.__bindDOMEvents();
    }
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
}
export const resizeComponent = new ResizeComponent();

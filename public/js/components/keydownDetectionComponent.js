import { DeviceActions } from '../flux/actionCreators/deviceActions'
class KeydownDetectionComponent {
  constructor() {
    this.__init();
  }
  __init() {
    document.addEventListener('keydown', this.__handleKeydown.bind(this), true);
  }
  __handleKeydown(evt) {
    console.log('keydown ', evt);
    DeviceActions.keydown(evt.keyCode);
  }
}
export const keydownDetectionComponent = new KeydownDetectionComponent();

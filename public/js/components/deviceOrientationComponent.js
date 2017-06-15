import { DeviceActions } from '../flux/actionCreators/deviceActions'
class DeviceOrientationComponent {
  constructor() {
    this.__init();
  }
  __init() {
    window.addEventListener('orientationchange', this.__handleOrientationChange.bind(this), true);
  }
  __handleOrientationChange(evt) {
    DeviceActions.orientationChange({orientation: window.orientation});
  }
}
export const deviceOrientationComponent = new DeviceOrientationComponent();

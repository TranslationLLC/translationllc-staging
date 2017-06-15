import { WindowActions } from '../flux/actionCreators/windowActions'
import { EventBus } from '../flux/eventBus'
class DetectionComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.__detect();
    this.__bindFlux();
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('orientationChange', this.__detect.bind(this));
    this.eventBus.addChangeListener('resize', this.__detect.bind(this));
  }
  __detect() {
    let userAgent = navigator.userAgent,
        bodyClientRect = document.getElementsByTagName('body')[0].getBoundingClientRect(),
        isApple = /iPad|iPhone|iPod/.test(userAgent) && !window.MSStream,
        isMobile = bodyClientRect.width < 960,
        isDesktop = !('ontouchstart' in window),
        isIpad = userAgent.match(/iPad/i) !== null,
        orientation = (window.orientation + 1) ? window.orientation : null,
        isLandscape = Math.abs(orientation) === 90,
        isSafari = false,
        useHeightAspectRatio = (1366/768) > (bodyClientRect.width / bodyClientRect.height),
        isBigIpad = (isIpad && window.screen.width >= 1024);
    if (userAgent.indexOf('Safari') !== -1 && userAgent.indexOf('Chrome') === -1) {
      isSafari = true;
    }
    WindowActions.signalDetection({
      isApple,
      isMobile,
      orientation,
      isSafari,
      isLandscape,
      isIpad,
      isBigIpad,
      useHeightAspectRatio,
      isDesktop
    });
  }
}
export const detectionComponent = new DetectionComponent();

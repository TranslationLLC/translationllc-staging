import { WindowActions } from '../flux/actionCreators/windowActions'
import { EventBus } from '../flux/eventBus'
class PreserveAspectRatioComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.preserveAspectRatioElements = document.getElementsByClassName('preserveAspectRatio');
    this.landscapePreserveAspectRatioElements = document.getElementsByClassName('landscapePreserveAspectRatio');
    this.videoPreserveAspectRatioElements = document.getElementsByClassName('videoPreserveAspectRatio');
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
  __detection(data) {
    this.isMobile = data.isMobile;
    this.isLandscape = data.isLandscape;
    this.__preserveAspectRatio();
    this.__preserveVideoAspectRatio();
  }
  __preserveAspectRatio() {
    window.setTimeout(() => {
      if (this.isMobile && !this.isBigIpad) {
        let width = window.innerWidth;
        for (let i = 0; i < this.preserveAspectRatioElements.length; i++) {
          this.preserveAspectRatioElements[i].style.height = `${width}px`;
        }
        if (this.isLandscape) {
          for (let j = 0; j < this.landscapePreserveAspectRatioElements.length; j++) {
            this.landscapePreserveAspectRatioElements[j].style.height = `${Math.round(width / 2)}px`;
          }
        }
      } else if (this.isBigIpad || !this.isMobile) {
        let widthUnit = window.innerWidth / 16,
            height = Math.round(widthUnit * 7),
            calculatedHeight;
        for (let i = 0; i < this.preserveAspectRatioElements.length; i++) {
          this.preserveAspectRatioElements[i].style.height = `${height}px`;
        }
      }
    }, 200);
  }
  __preserveVideoAspectRatio() {
    if (this.isMobile) {
      let width = window.innerWidth;
      for (let i = 0; i < this.videoPreserveAspectRatioElements.length; i++) {
        this.videoPreserveAspectRatioElements[i].style.height = `${width - 30}px`;
      }
    }
  }
  __resizeImages() {

  }
}
export const preserveAspectRatioComponent = new PreserveAspectRatioComponent();

import { EventBus } from '../flux/eventBus'
class SafariComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.__bindFlux();
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
  __detection(data) {
    if (data.isSafari && !data.isMobile) {
      this.__setDOMVariables();
    }
  }
  __setDOMVariables() {
    this.translationllcCulturalCatalystsElement = document.getElementById('translationllcCulturalCatalysts');
    this.translationllcWeAreTranslationDesktopElement = document.getElementById('translationllcWeAreTranslationDesktop');
    this.__applySafariStyles();
  }
  __applySafariStyles() {
    this.translationllcCulturalCatalystsElement.style.transform = 'translateY(-55%)';
    this.translationllcWeAreTranslationDesktopElement.style.transform = 'translateY(-54%)';
  }
}
export const safariComponent = new SafariComponent();

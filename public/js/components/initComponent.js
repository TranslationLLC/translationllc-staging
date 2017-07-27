import { EventBus } from '../flux/eventBus'
import { WindowActions } from '../flux/actionCreators/windowActions'
let localStorage = window.localStorage;
class InitComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.initialScroll = true;
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
    window.addEventListener('hashchange', (evt) => {
      if (window.location.hash === '#introSection') {
        this.navElement.style.top = 0;
      }
    });
    this.__setDOMVariables();
    this.__bindDOMEvents();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.body = document.getElementsByTagName('body')[0];
    this.navElement = document.getElementById('nav');
    this.introElement = document.getElementById('translationllcIntro');
    this.mainElement = document.getElementById('translationllcMain');
    this.htmlElement = document.getElementsByTagName('html')[0];
    this.animationElementDesktop = document.getElementById('translationllcAnimationDesktop');
    this.animationPlusIconSvg = document.getElementById('animationPlusIconSvg');
    this.animationPlusIcon = document.getElementById('animationPlusIcon');
    this.animationPlusIcon1 = document.getElementById('animationPlusIcon1');
    this.animationPlusIcon2 = document.getElementById('animationPlusIcon2');
    this.translationllcWeAreTranslationDesktop = document.getElementById('translationllcWeAreTranslationDesktop');
    // this.animationPlusIcon = document.getElementById('animationPlusIcon');
    this.introSectionNav = document.getElementById('introSectionNav');
    this.carouselDesktopWrapper = document.getElementById('carouselDesktopWrapper');
    this.backgroundParallaxOnePlaceholder = document.getElementById('backgroundParallaxOnePlaceholder');
    this.translationllcMainHash = document.getElementById('translationllcMain');
    this.translationllcWeAreCulturalCatalysts = document.getElementById('translationllcWeAreCulturalCatalysts');
    this.translationllcWeAreTranslation = document.getElementById('translationllcWeAreTranslation');
    this.translationllcCulturalCatalysts = document.getElementById('translationllcCulturalCatalysts');
  }
  __bindDOMEvents() {
    this.introSectionNav.addEventListener(window.clickevent, evt => {
      window.location.hash = '#introSection';
      window.location = window.location.href;
    });
    this.animationPlusIcon.addEventListener('animationend', () => {
      this.animationPlusIcon.style.transform = 'scale(50)';
      this.animationPlusIcon.style['z-index'] = 0;
      this.animationPlusIcon1.style['z-index'] = 1;
      this.animationPlusIcon1.style.opacity = 1;
      this.animationPlusIcon1.classList.add('translationllc__intro__background__plus--desktop--active');
    });
    this.animationPlusIcon1.addEventListener('animationend', () => {
      this.animationPlusIcon.style.opacity = 0;
      this.animationPlusIcon1.style.transform = 'scale(50)';
      this.animationPlusIcon1.style['z-index'] = 0;
      this.animationPlusIcon2.style['z-index'] = 1;
      this.animationPlusIcon2.style.opacity = 1;
      this.animationPlusIcon2.classList.add('translationllc__intro__background__plus--desktop--active');
    });
    this.animationPlusIcon2.addEventListener('animationend', () => {
      this.animationPlusIcon1.style.opacity = 0;
      this.animationPlusIcon2.style.opacity = 0;
      this.introElement.style.display = 'none';
      this.mainElement.style.display = 'block';
      if (this.isSafari) {
        this.htmlElement.style.overflow = null;
      }
      this.body.style.touchAction = 'auto';
      this.navElement.style.opacity = 1;
      this.navElement.style.top = 0;
      this.mainElement.style.opacity = 1;
      if (window.location.hash) {
        window.scrollTo(0, document.getElementById(window.location.hash.split('#')[1]).offsetTop);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
  __currentPosition() {
    return window.pageYOffset;
  }
  __showIntro(detectionData) {
    if (detectionData.isDesktop) {
      this.mainElement.style.display = 'none';
      // this.animationPlusIcon.style.display = 'none';
      this.translationllcWeAreTranslation.style.display = 'none';
      this.animationScrollHandlerDesktop = this.__animationScrollHandler.bind(this);
      this.eventBus.addChangeListener('signalScroll', this.animationScrollHandlerDesktop);
      if (detectionData.isSafari) {
        this.htmlElement.style.overflow = 'auto';
        this.carouselDesktopWrapper.style.height = '100%';
      }
    } else if (detectionData.isLandscape && detectionData.isIpad) {
      this.carouselDesktopWrapper.style.display = 'none';
    }
  }
  __resizeSvgs(detectionData) {
    if (detectionData.isDesktop || (detectionData.isIpad && Math.abs(detectionData.orientation) === 90)) {
      this.translationllcWeAreTranslationDesktop.classList.remove('hide-component');
      // this.animationPlusIcon.classList.remove('hide-component');
      // if (detectionData.isDesktop) {
      //   this.carouselDesktopWrapper.classList.remove('hide-component');
      // }
      // this.animationPlusIcon.style.backgroundSize = `${this.animationPlusIcon.getBoundingClientRect().height / 2}px`;
    } else if (detectionData.orientation === 0) {
      //77 when logo is in the header
      // this.animationPlusIcon.style.height = `${Math.floor(Math.ceil(window.innerHeight / 2 + 100 - 44) * .6)}px`;
      // this.animationPlusIcon.style.width = '50%';
      this.translationllcWeAreTranslation.style.height = `${Math.floor(Math.ceil(window.innerHeight / 2 + 100 - 44) * .6)}px`;
      this.translationllcWeAreTranslation.style.top = '50%';
      this.translationllcWeAreTranslation.transform = 'translateY(-50%)';
    } else if (Math.abs(detectionData.orientation) === 90) {
      // this.animationPlusIcon.style.height = '100%';
      // this.animationPlusIcon.style.width = '40%';
      this.translationllcWeAreTranslation.style.height = '50%';
      this.translationllcWeAreTranslation.style.top = '40%';
    }
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.animationScrollHandler = this.__animationScrollHandler.bind(this);
    this.handleKeydownHandler = this.__handleKeydown.bind(this);
    this.eventBus.addChangeListener('signalTouchmove', this.animationScrollHandler);
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
    this.eventBus.addChangeListener('keydown', this.handleKeydownHandler);
  }
  __handleKeydown(keycode) {
    if (keycode === 38 || keycode === 40) {
      this.__animationScrollHandler();
    }
  }
  __animationScrollHandler(data) {
    if (!this.initialScroll) {
      WindowActions.endAnimation();
      this.animationPlusIcon.style.top = '50%';
      this.animationPlusIcon.classList.add('translationllc__intro__background__plus--desktop--active');
      // this.animationPlusIcon.style.top = '50%';
      this.animationPlusIcon.classList.add('translationllc__intro__background__plus--desktop--active');
      this.animationPlusIconSvg.classList.add('translationllc__intro__background__plus--svg--active')
      // window.setTimeout(() => {
      //   this.introElement.style.display = 'none';
      //   this.mainElement.style.display = 'block';
      //   if (window.location.hash) {
      //     window.scrollTo(0, document.getElementById(window.location.hash.split('#')[1]).offsetTop);
      //   } else {
      //     window.scrollTo(0, 0);
      //   }
      // }, 1000);
      if (this.animationScrollHandlerDesktop) {
        this.eventBus.removeChangeListener('signalScroll', this.animationScrollHandlerDesktop);
      }
      if (this.handleKeydownHandler) {
        this.eventBus.removeChangeListener('keydown', this.handleKeydownHandler);
      }
      this.eventBus.removeChangeListener('signalTouchmove', this.animationScrollHandler);
      // window.setTimeout(() => {
      //   if (this.isSafari) {
      //     this.htmlElement.style.overflow = null;
      //   }
      // }, 500);
      // window.setTimeout(() => {
      //   this.body.style.touchAction = 'auto';
      //   this.navElement.style.opacity = 1;
      //   this.navElement.style.top = 0;
      //   this.mainElement.style.opacity = 1;
      // }, 500);
    }
    this.initialScroll = false;
  }
  __detection(data) {
    if (!this.introLoaded) {
      this.isMobile = data.isMobile;
      this.isSafari = data.isSafari;
      this.isDesktop = data.isDesktop;
      this.__resizeSvgs(data);
      this.__showIntro(data);
    }
    this.introLoaded = true;
  }
  __showMain() {
    this.mainElement.style.display = 'block';
  }
}
export const initComponent = new InitComponent();

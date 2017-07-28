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
      if (window.location.hash === '#intro') {
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
    this.animationPlusIcon = document.getElementById('animationPlusIcon');
    this.animationPlusIcon1 = document.getElementById('animationPlusIcon1');
    this.animationPlusIcon2 = document.getElementById('animationPlusIcon2');
    this.translationllcWeAreTranslationDesktop = document.getElementById('translationllcWeAreTranslationDesktop');
    this.animationPlusIcons = document.getElementsByClassName('translationllc__intro__background__plus');
    this.carouselDesktopWrapper = document.getElementById('carouselDesktopWrapper');
    this.backgroundParallaxOnePlaceholder = document.getElementById('backgroundParallaxOnePlaceholder');
    this.translationllcMainHash = document.getElementById('translationllcMain');
    this.translationllcWeAreCulturalCatalysts = document.getElementById('translationllcWeAreCulturalCatalysts');
    this.translationllcCulturalCatalysts = document.getElementById('translationllcCulturalCatalysts');
  }
  __bindDOMEvents() {
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
      // let sections = document.querySelectorAll('[data-section-id]');
      // for (let i = 0; i < sections.length; i++) {
      //   sections[i].setAttribute('id', sections[i].dataset['sectionId']);
      // }
      if (window.location.hash) {
        window.scrollTo(0, document.getElementById(window.location.hash.split('#')[1]).offsetTop);
      } else {
        window.scrollTo(0, 0);
      }
    });
  }
  __showIntro(detectionData) {
    if (detectionData.isDesktop) {
      this.mainElement.style.display = 'none';
      this.animationScrollHandlerDesktop = this.__animationScrollHandler.bind(this);
      this.eventBus.addChangeListener('signalScroll', this.animationScrollHandlerDesktop);
      if (detectionData.isSafari) {
        this.htmlElement.style.overflow = 'auto';
        this.carouselDesktopWrapper.style.height = '100%';
      }
    } else {
      if (this.isMobile && this.isSafari) {
        //iOS hack to force scroll back to top if hash in url
        window.setTimeout(() => {
          window.scrollTo(0, 0);
        }, 500);
      }
      this.carouselDesktopWrapper.style.display = 'none';
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
      this.animationPlusIcon.classList.add('translationllc__intro__background__plus--desktop--active');
      if (this.animationScrollHandlerDesktop) {
        this.eventBus.removeChangeListener('signalScroll', this.animationScrollHandlerDesktop);
      }
      if (this.handleKeydownHandler) {
        this.eventBus.removeChangeListener('keydown', this.handleKeydownHandler);
      }
      this.eventBus.removeChangeListener('signalTouchmove', this.animationScrollHandler);
    }
    this.initialScroll = false;
  }
  __detection(data) {
    this.isSafari = data.isSafari;
    this.isMobile = data.isMobile;
    this.__showIntro(data);
  }
}
export const initComponent = new InitComponent();

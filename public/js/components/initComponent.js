import { EventBus } from '../flux/eventBus'
import { WindowActions } from '../flux/actionCreators/windowActions'
class InitComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.animationScale = 1;
    this.animationThreshold = 0;
    this.endAnimation = false;
    this.initialScroll = true;
    this.setTransformOnPlus = true;
    window.addEventListener('beforeunload', () => {
      window.scrollTo(0, 0);
    });
    window.addEventListener('hashchange', (evt) => {
      if (window.location.hash === '#top') {
        this.navElement.style.top = 0;
      }
    });
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.body = document.getElementsByTagName('body')[0];
    this.navElement = document.getElementById('nav');
    this.introElement = document.getElementById('translationllcIntro');
    this.mainElement = document.getElementById('translationllcMain');
    this.htmlElement = document.getElementsByTagName('html')[0];
    this.animationElementDesktop = document.getElementById('translationllcAnimationDesktop');
    this.animationPlusIconDesktop = document.getElementById('animationPlusIconDesktop');
    this.translationllcWeAreTranslationDesktop = document.getElementById('translationllcWeAreTranslationDesktop');
    this.animationPlusIcon = document.getElementById('animationPlusIcon');
    this.introSectionNav = document.getElementById('introSectionNav');
    this.carouselDesktopWrapper = document.getElementById('carouselDesktopWrapper');
    this.backgroundParallaxOnePlaceholder = document.getElementById('backgroundParallaxOnePlaceholder');
    this.introSectionNav.addEventListener(window.clickevent, this.__navigateToIntroSection.bind(this));
    this.translationllcMainHash = document.getElementById('translationllcMain');
    this.translationllcWeAreCulturalCatalysts = document.getElementById('translationllcWeAreCulturalCatalysts');
    this.translationllcWeAreTranslation = document.getElementById('translationllcWeAreTranslation');
    this.translationllcCulturalCatalysts = document.getElementById('translationllcCulturalCatalysts');
  }
  __currentPosition() {
    return window.pageYOffset;
  }
  __navigateToIntroSection(evt) {
    window.location.hash = 'top';
    let startY = this.__currentPosition(),
        stopY = this.__elmYPosition(this.translationllcMainHash),
        distance = stopY >  startY ? stopY - startY : startY - stopY,
        speed,
        step,
        leapY,
        timer,
        i,
        j;
    if (distance < 100) {
      window.scrollTo(0, stopY);
    }
    speed = Math.round(distance / 10000);
    if (speed >= 20) speed = 20;
    step = Math.round(distance / 100);
    leapY = stopY > startY ? startY + step : startY  - step;
    timer = 0;
    if (stopY > startY) {
      for (i = startY; i < stopY; i += step) {
        setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
        leapY += step;
        if (leapY > stopY) {
          leapY = stopY;
          timer++;
        }
        return;
      }
    }
    for (j = startY; j > stopY; j -= step) {
      setTimeout('window.scrollTo(0, ' + leapY + ')', timer * speed);
      leapY -= step;
      if (leapY < stopY) {
        leapY -= step;
        if (leapY < stopY) {
          leapY = stopY;
          timer++;
        }
      }
    }
  }
  __showIntro(detectionData) {
    if (detectionData.isDesktop) {
      this.mainElement.style.display = 'none';
      this.animationPlusIcon.style.display = 'none';
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
      this.animationPlusIconDesktop.classList.remove('hide-component');
      this.animationPlusIcon.style.height = '100%';
      if (detectionData.isDesktop) {
        this.carouselDesktopWrapper.classList.remove('hide-component');
      }
      this.animationPlusIconDesktop.style.backgroundSize = `${this.animationPlusIconDesktop.getBoundingClientRect().height / 2}px`;
    } else if (detectionData.orientation === 0) {
      //77 when logo is in the header
      this.animationPlusIcon.style.height = `${Math.floor(Math.ceil(window.innerHeight / 2 + 100 - 44) * .6)}px`;
      this.animationPlusIcon.style.width = '50%';
      this.translationllcWeAreTranslation.style.height = `${Math.floor(Math.ceil(window.innerHeight / 2 + 100 - 44) * .6)}px`;
      this.translationllcWeAreTranslation.style.top = '50%';
      this.translationllcWeAreTranslation.transform = 'translateY(-50%)';

      // this.animationPlusIconResolve.style.height = `${Math.ceil(window.innerHeight / 4)}px`;
      // this.translationllcWeAreTranslation.style.height = `${Math.ceil(window.innerHeight / 2 + 100 - 44)}px`;
      // this.translationllcWeAreCulturalCatalysts.style.height = `${(window.innerHeight - 50) / 2}px`;
      // this.translationllcCulturalCatalysts.style.height = `${Math.ceil(window.innerHeight / 4 + 100 - 44)}px`;
      // this.backgroundParallaxOnePlaceholder.style.height = `${Math.ceil(window.innerHeight / 4 + 100 - 44)}px`;
    } else if (Math.abs(detectionData.orientation) === 90) {
      this.animationPlusIcon.style.height = '100%';
      this.animationPlusIcon.style.width = '40%';
      this.translationllcWeAreTranslation.style.height = '50%';
      this.translationllcWeAreTranslation.style.top = '40%';
    }
  }
  __elmYPosition(element) {
    let y = element.offsetTop,
        node = element;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.animationScrollHandler = this.__animationScrollHandler.bind(this);
    this.eventBus.addChangeListener('signalTouchmove', this.animationScrollHandler);
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
  __animationScrollHandler(data) {
    console.log('this.isDesktop ', this.isDesktop);
    if (!this.initialScroll) {
      this.animationThreshold = 20;
      if (!this.isDesktop) {
        this.animationThreshold = 16;
        this.animationScale = this.animationScale + 2;
      } else if (this.isSafari) {
        this.animationThreshold = 40;
        this.animationScale = this.animationScale + 5;
      } else {
        this.animationScale = this.animationScale + 3;
      }
      if (this.animationScale <= this.animationThreshold && !this.endAnimation) {
        this.animationPlusIconDesktop.style.top = '50%';
        this.animationPlusIconDesktop.style.transform = `translate3d(0, -50%, 0) scale(${Math.round(this.animationScale)})`;
        this.animationPlusIcon.style.top = '50%';
        this.animationPlusIcon.style.transform = `translateY(-50%) scale(${this.animationScale})`;
      } else {
        this.endAnimation = true;
        this.introElement.style.display = 'none';
        this.mainElement.style.display = 'block';
        // this.navElement.style.opacity = 1;
        if (this.animationScrollHandlerDesktop) {
          this.eventBus.removeChangeListener('signalScroll', this.animationScrollHandlerDesktop);
        }
        this.eventBus.removeChangeListener('signalTouchmove', this.animationScrollHandler);
        WindowActions.endAnimation();
        window.setTimeout(() => {
          // window.scrollTo(0, 0);
          // this.resolveElement.style.opacity = 1;
        });
        window.setTimeout(() => {
          this.navElement.style.top = '-110px';
          if (this.isSafari) {
            this.htmlElement.style.overflow = null;
          }
          // this.resolveElement.style.opacity = 0;
          // this.mainElement.style.top = '120px';
          // this.mainElement.style.position = 'relative';
          // this.mainElement.style.background = 'black';
        });
        window.setTimeout(() => {
          this.body.style.touchAction = 'auto';
          this.navElement.style.opacity = 1;
          this.navElement.style.top = 0;
          this.mainElement.style.opacity = 1;
          window.scrollTo(0, 0);
          // window.scrollTo(0, 0);
        });
      }
    }
    this.initialScroll = false;
  }
  __detection(data) {
    if (!this.introLoaded) {
      let localStorage = window.localStorage,
          introFlag = false,
          getIntroFlag = new Promise((resolve, reject) => {
            introFlag = localStorage.getItem('introFlag');
            resolve(introFlag);
          });
      this.isMobile = data.isMobile;
      this.isSafari = data.isSafari;
      this.isDesktop = data.isDesktop;
      getIntroFlag.then((introFlag) => {
        if (!introFlag) {
          this.__resizeSvgs(data);
          this.__showIntro(data);
        } else {
          this.__showMain();
        }
      });
    }
    this.introLoaded = true;
  }
  __showMain() {
    this.mainElement.style.display = 'block';
  }
}
export const initComponent = new InitComponent();

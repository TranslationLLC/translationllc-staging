import { EventBus } from '../flux/eventBus'
import { isElementInViewport } from '../utils/isElementInViewport'
class GradientParallaxComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.parallaxHash = {};
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.parallaxElements = document.getElementsByClassName('gradientParallax');
    this.stoutisms = document.getElementsByClassName('translationllc__stoutism');
    this.backgroundParallaxOne = document.getElementById('backgroundParallaxOne');
    for (let i = 0; i < this.parallaxElements.length; i++) {
      this.parallaxHash[this.parallaxElements[i].id] = {
        parallaxElement: this.parallaxElements[i],
      }
    }
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalScroll', this.__parallaxHandler.bind(this));
    this.eventBus.addChangeListener('signalDetection', this.__detect.bind(this));
    this.eventBus.addChangeListener('videoPlayed', this.__videoPlayed.bind(this));
  }
  __videoPlayed() {
    this.videoPlayed = true;
  }
  __detect(detectionData) {
    if (!this.currentOrientation) {
      this.currentOrientation = detectionData.isLandscape;
    }
    this.isMobile = detectionData.isMobile;
    this.isBigIpad = detectionData.isBigIpad;
    if (this.isBigIpad) {
      this.__setGradientPosition();
    }
    if (!this.setInitialOpacity) {
      if (this.isMobile) {
        this.backgroundParallaxOne.style.opacity = '1';
        this.setInitialOpacity = true;
      }
    } else {
      if (this.isDesktop) {
        this.backgroundParallaxOne.style.opacity = '0';
      }
    }
  }
  __setGradientPosition() {
    for (let i = 0; i < this.stoutisms.length; i++) {
      this.stoutisms[i].style.position = 'absolute';
      this.stoutisms[i].style.height = '100%';
    }
  }
  __parallaxHandler(data) {
    let parallaxComponent,
        rect;
    for (let i = 0; i < this.parallaxElements.length; i++) {
      parallaxComponent = this.parallaxHash[this.parallaxElements[i].id];
      rect = parallaxComponent.parallaxElement.getBoundingClientRect();
      if (isElementInViewport(rect)) {
        if (parallaxComponent.parallaxElement.id !== 'featuredVideo') {
          parallaxComponent.parallaxElement.style.zIndex = 2;
        } else {
          if (rect.top < 0) {
            this.backgroundParallaxOne.style.opacity = '0';
          } else {
            if (!this.videoPlayed) {
              this.backgroundParallaxOne.style.opacity = '1';
            } else {
              this.videoPlayed = false;
            }
          }
        }
      } else {
        parallaxComponent.parallaxElement.style.zIndex = 1;
      }
    }
  }
}

export const gradientParallaxComponent = new GradientParallaxComponent();

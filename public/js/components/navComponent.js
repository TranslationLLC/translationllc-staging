import { EventBus } from '../flux/eventBus'
import { isElementInViewport } from '../utils/isElementInViewport'
class NavComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.previousScroll = 0;
    this.previousHash = window.location.hash;
    window.location.hash = '';
    this.__setDOMVariables();
    this.__bindDOMEvents();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.navMenu = document.getElementById('nav');
  }
  __bindDOMEvents() {
    this.navMenu.addEventListener(window.clickevent, this.__navigationHandler.bind(this))
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalDetection', this.__detection.bind(this));
  }
  __detection(detectionData) {
    this.__boundAnimateNav = this.__animateNav.bind(this);
    if (detectionData.isMobile) {
      if (!this.changeListenerAdded) {
        this.eventBus.addChangeListener('signalScroll', this.__boundAnimateNav);
      }
      this.changeListenerAdded = true;
    } else {
      this.eventBus.removeChangeListener('signalScroll', this.__boundAnimateNav);
      this.changeListenerAdded = false;
    }
  }
  __navigationHandler(evt) {
    evt.preventDefault();
    // this.navMenu.style.top = '-150px';
    if (evt.target.hash) {
      this.previousHash = window.location.hash;
      window.location.hash = evt.target.hash;
    }
  }
  __animateNav(data) {
    if (data.lastKnownScrollPosition === 0) {
      this.navMenu.style.top = 0;
    } else {
      if (this.previousScroll > data.lastKnownScrollPosition) {
        if (window.location.hash !== this.previousHash) {
          this.navMenu.style.top = '-170px';
          this.previousHash = window.location.hash;
        } else {
          this.navMenu.style.top = 0;
        }
      } else {
        if (data.lastKnownScrollPosition > 500) {
          this.navMenu.style.top = '-170px';
        }
      }
    }
    this.previousScroll = data.lastKnownScrollPosition;
  }
}
export const navComponent = new NavComponent();

import { EventBus } from '../flux/eventBus'
import { isElementInViewport } from '../utils/isElementInViewport'
class ParallaxComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.parallaxHash = {};
    this.__setDOMVariables();
    this.__bindFlux();
  }
  __setDOMVariables() {
    this.parallaxElements = document.getElementsByClassName('parallax');
    for (let i = 0; i < this.parallaxElements.length; i++) {
      this.parallaxHash[this.parallaxElements[i].id] = {
        backgroundPositionY: 0,
        parallaxElement: this.parallaxElements[i],
        parallaxElementPositionY: 0,
        backgroundLayer: this.parallaxElements[i].getElementsByClassName('parallax__layer--back')[0]
      }
    }
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('signalScroll', this.__parallaxHandler.bind(this));
  }
  __parallaxHandler(data) {
    // console.log('data ', data);
    for (let i = 0; i < this.parallaxElements.length; i++)
      let parallaxComponent = this.parallaxHash[this.parallaxElements[i].id],
          parallaxElement = parallaxComponent['parallaxElement'];
      if (isElementInViewport(parallaxComponent['parallaxElement'], i)) {
        parallaxComponent['parallaxElementPositionY'] = Math.ceil(parallaxComponent['parallaxElementPositionY'] + (window.innerHeight * .0008));
        parallaxElement.style.position = 'absolute';
        parallaxElement.style.width = '100%';
        parallaxElement.style.transform = `translate3d(0, ${(-1 * parallaxComponent['parallaxElementPositionY']) + 'px'}, 0)`;
        if (parallaxComponent['backgroundPositionY'] < 330) {
          parallaxComponent['backgroundPositionY'] = Math.round(parallaxComponent['backgroundPositionY'] + (window.innerHeight * 0.004));
          parallaxComponent['backgroundLayer'].style.transform = `translate3d(0, ${(-1 * parallaxComponent['backgroundPositionY']) + 'px'}, 0)`;
        }
      } else {
        parallaxComponent['backgroundPositionY'] = 0;
        parallaxComponent['backgroundLayer'].style.transform = 'translate3d(0, 0, 0)';
      }
    }
  }
}
export const parallaxComponent = new ParallaxComponent();

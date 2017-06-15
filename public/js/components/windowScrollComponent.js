import { WindowActions } from '../flux/actionCreators/windowActions'
import { EventBus } from '../flux/eventBus'
class WindowScrollComponent {
  constructor() {
    this.__init();
    this.lastScrollTop = 0;
  }
  __touchmoveEventHandler(evt) {
    evt.preventDefault();
    WindowActions.signalTouchmove(evt);
  }
  __init() {
    let lastKnownScrollPosition = 0,
        scrollDirection,
        ticking = false;
    if (window.clickevent === 'touchstart') {
      this.touchmoveEventHandler = this.__touchmoveEventHandler.bind(this);
      window.addEventListener('touchmove', this.touchmoveEventHandler, false);
    }
    window.addEventListener('scroll', (evt) => {
      lastKnownScrollPosition = window.scrollY;
      if (!ticking) {
        if (lastKnownScrollPosition > this.lastScrollTop) {
          scrollDirection = 'down';
        } else {
          scrollDirection = 'up';
        }
        this.lastScrollTop = lastKnownScrollPosition;
        window.requestAnimationFrame(() => {
          this.__signalScrollEvent({lastKnownScrollPosition, scrollDirection});
          ticking = false;
        });
      }
      ticking = true;
    }, false);
    this.__bindFlux();
  }
  __signalScrollEvent(scrollData) {
    WindowActions.signalScroll(scrollData);
  }
  __bindFlux() {
    this.eventBus = EventBus.getInstance();
    this.eventBus.addChangeListener('endAnimation', this.__endAnimation.bind(this));
  }
  __endAnimation() {
    window.removeEventListener('touchmove', this.touchmoveEventHandler);
  }
}
export const windowScrollComponent = new WindowScrollComponent();

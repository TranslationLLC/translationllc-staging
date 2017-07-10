import { EventBus } from '../flux/eventBus'
class HamburgerMenuComponent {
  constructor() {
    this.__init();
  }
  __init() {
    this.__setDOMVariables();
    this.__bindDOMEvents();
  }
  __setDOMVariables() {
    this.hamburgerMenuToggle = document.getElementById('hamburgerMenuToggle');
    this.hamburgerMenuDropdown = document.getElementById('hamburgerMenuDropdown');
  }
  __bindDOMEvents() {
    if (window.clickevent === 'touchstart') {

    } else {
      this.hamburgerMenuToggle.addEventListener(window.clickevent, this.__handleHamburgerMenuToggle.bind(this));
    }
  }
  __handleHamburgerMenuToggleMobile() {

  }
  __handleHamburgerMenuToggle() {
    this.hamburgerMenuDropdown.classList.toggle('translationllc__nav__hamburger-dropdown--inactive');
    this.hamburgerMenuDropdown.classList.toggle('translationllc__nav__hamburger-dropdown--active');
  }
}
export const hamburgerMenuComponent = new HamburgerMenuComponent();

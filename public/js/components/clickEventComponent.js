class ClickEventComponent {
  constructor() {
    this.__init();
  }
  __init() {
    window.clickevent = 'ontouchstart' in document.documentElement ? 'touchstart' : 'click';
  }
}
export const clickEventComponent = new ClickEventComponent();

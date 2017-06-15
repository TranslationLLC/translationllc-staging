export function isElementInViewport(rect, i) {
  // console.log('i ', i);
  return (
    rect.top <= window.innerHeight &&
    rect.bottom > 0
    // rect.top <= window.innerHeight &&
    // rect.left >= 0 &&
    // rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    // rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

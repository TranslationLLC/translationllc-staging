export function isElementInViewport(rect, i) {
  return (
    rect.top <= window.innerHeight &&
    rect.bottom > 0
  );
}

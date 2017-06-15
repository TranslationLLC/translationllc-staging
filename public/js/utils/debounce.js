export function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    let callNow = immediate && !timeout,
        later,
        context = this,
        args = arguments;
    if (callNow) {
      func.apply(context, args);
    } else {
      later = function() {
        timeout = null;
        func.apply(context, args);
      }
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    }
  }
}

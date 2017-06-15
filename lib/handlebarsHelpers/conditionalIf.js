module.exports = function conditionalIf(item1, item2, options) {
  if (item1 === item2) {
    return options.fn(this);
  }
  return options.inverse(this);
}

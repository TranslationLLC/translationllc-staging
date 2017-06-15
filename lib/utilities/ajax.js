module.exports = function ajax(parameters) {
  var httpRequest = new XMLHttpRequest();
  if (parameters.progressCallback) {
    httpRequest.upload.addEventListener('progress', parameters.progressCallback);
  }
  httpRequest.onreadystatechange = (evt) => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      parameters.callback(httpRequest.response);
    }
  };
  httpRequest.open(parameters.httpVerb, parameters.url);
  if (parameters.contentHeader) {
    httpRequest.setRequestHeader(parameters.contentHeader.type, parameters.contentHeader.value);
    if (parameters.contentHeader.value === 'application/json') {
      httpRequest.send(JSON.stringify(parameters.data) || null);
    } else {
      httpRequest.send(parameters.data|| null);
    }
  } else {
    httpRequest.send(parameters.data || null);
  }
}

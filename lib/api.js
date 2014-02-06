var request = require('sdk/request');

exports['sendToInstapaper'] = sendToInstapaper;
exports['buildEndpoint'] = buildEndpoint;

// Sends the given article to given valid Instapaper endpoint.
// See https://www.instapaper.com/api/simple
//
function sendToInstapaper(endpoint, url, onSuccess, onFailure) {
  request.Request({
    url: endpoint + "&url=" + escape(url),
    onComplete: createHandler(onSuccess, onFailure)
  }).get();
}

// Builds an endpoint URL for sending articles,
// specifying Instagram username and password.
//
function buildEndpoint(username, password) {
  return "https://www.instapaper.com/api/add?username=" + username + "&password=" + password;
}

// Creates a handler for responses depending on the status code.
// See "Resulting status codes" section in API documentation.
//
function createHandler(onSuccess) {
  return function (response) {
    if (response.status.toString()[0] == '2') onSuccess();
  };
}

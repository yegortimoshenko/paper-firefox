var prefs = require("sdk/simple-prefs").prefs;
var tabs = require('sdk/tabs');

var { preprocess } = require('url');
var api = require('api');
var ui = require('ui');

// Wrapper under api.sendToInstapaper function that builds endpoint URL
// and passes button UI functions to api.sendToInstapaper.
//
function sendToInstapaper(url, button) {
  var endpoint = api.buildEndpoint(prefs.username, prefs.password);
  api.sendToInstapaper(endpoint, preprocess(url), function() {
    ui.updateSuccess(button);
    if (prefs.notifications == true) ui.notify(url);
  });
};

var button = ui.createButton(function() {
  sendToInstapaper(tabs.activeTab.url, button);
});

if (prefs.combo != "") {
  ui.createHotkey(prefs.combo, function() {
    sendToInstapaper(tabs.activeTab.url, button);
  });
};

if (prefs.modifier != "N") {
  ui.injectListener(prefs.modifier, function(url) {
    sendToInstapaper(url, button);
  });
}

if (prefs.rightClick == true) {
  ui.addToMenu(function(url) {
    sendToInstapaper(url, button);
  });
}

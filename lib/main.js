var prefs = require("sdk/simple-prefs").prefs;
var tabs = require('sdk/tabs');

var api = require('api');
var ui = require('ui');

// Wrapper under api.buildEndpoint function that takes username
// and password from simple-prefs.
//
function buildEndpoint() {
  return api.buildEndpoint(prefs.username, prefs.password);
};

// Wrapper under api.sendToInstapaper function that passes
// button UI functions by default.
//
function sendToInstapaper(url, state) {
  api.sendToInstapaper(buildEndpoint(), url, ui.updateSuccess(button));
};

var button = ui.createButton(function() {
  sendToInstapaper(tabs.activeTab.url, button);
});

if (prefs.combo != "") {
  ui.createHotkey(prefs.combo, function() {
    sendToInstapaper(tabs.activeTab.url, button);
  });
};

if (prefs.modifier != "none") {
  ui.injectListener(prefs.modifier, function(url) {
    sendToInstapaper(url, button);
  });
}

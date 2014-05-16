var prefs = require("sdk/simple-prefs").prefs;
var tabs = require('sdk/tabs');

var api = require('api');
var ui = require('ui');

// Wrapper under api.sendToInstapaper function that builds endpoint URL
// and passes button UI functions to api.sendToInstapaper.
//
function sendToInstapaper(url, state) {
  var endpoint = api.buildEndpoint(prefs.username, prefs.password);
  api.sendToInstapaper(endpoint, url, ui.updateSuccess(button));
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

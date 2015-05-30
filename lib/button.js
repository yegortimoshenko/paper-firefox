let locale = require('sdk/l10n');
let ui = require('sdk/ui');

let defaultIcon = { '16': './default-16.png' };
let successIcon = { '16': './success-16.png' };

// Creates a Paper button which executes the given function on click.
exports.create = function() {
  return ui.ActionButton({
    id: 'paper-button',
    label: locale.get('send_to_instapaper'),
    icon: defaultIcon,
    onClick: function() { exports.send(this) }
  });
}

exports.disable = function(button, tab) {
  let isDisabled = false;
  let url = tab.url;

  if (url.indexOf('about') === 0 || url.indexOf('chrome://') === 0)
    isDisabled = true;

  button.state('window', { disabled: isDisabled });
}

let instapaper = require('./instapaper');
let prefs = require('sdk/simple-prefs').prefs;
let tabs = require('sdk/tabs');

// Sends given URL to Instapaper API. Updates button icon.
// If notifications are on, sends one.
exports.send = function(button, url) {
  if (!url) url = tabs.activeTab.url;
  instapaper.add(prefs.username, prefs.password, url, function() {
    if (prefs.notifications) notify(url);
    succeed(button);
  });
}

let notifications = require('sdk/notifications');

// Sends a system notification about URL added to Instapaper.
function notify(url) {
  notifications.notify({
    title: locale.get('added_to_instapaper'),
    text: url.replace(/^https?:\/\//, '').replace(/\/$/, '')
  });
}

// Changes the icon on the button to Instapaper logo.
function restore(button) {
  button.state('window', { icon: defaultIcon });
}

let timers = require('sdk/timers');

// Changes the icon on the button to a tick.
function succeed(button) {
  button.state('window', { icon: successIcon });
  timers.setTimeout(function() { restore(button) }, 1400);
}

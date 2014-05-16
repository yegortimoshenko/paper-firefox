let { setTimeout } = require('sdk/timers');
var { PageMod } = require("sdk/page-mod");
var { Hotkey } = require("sdk/hotkeys");

var data = require("sdk/self").data;
var ui = require("sdk/ui");

// Creates an Instapaper button which does the specified
// action when is pressed (i.e. clicked on).
//
exports.createButton = function(onClick) {
  return ui.ActionButton({
    id: "paper-button",
    label: "Send to Instapaper",
    icon: "./default.png",
    onClick: onClick
  });
}

// Returns a function that changes the icon on the button
// into its success state.
//
exports.updateSuccess = function(button) {
  return function () {
    button.state("window", {icon: "./success.png"});
    setTimeout(updateDefault(button), 1400);
  };
}

// Returns a function that returns the icon on the button
// into its default state.
//
function updateDefault(button) {
  return function () {
    button.state("window", {icon: "./default.png"});
  }
}

// Creates a Hotkey handler which does the specified action
// when the specified combination of keys is pressed.
//
exports.createHotkey = function(combo, onPress) {
  Hotkey({
    combo: combo,
    onPress: onPress
  });
}

// Inject a listener JS to all pages. It activates only at given
// key combination. See data/listener.js for the rest of the code.
//
exports.injectListener = function(modifier, onClick) {
  PageMod({
    include: '*',
    contentScriptWhen: 'ready',
    contentScriptFile: data.url("listener.js"),
    contentScriptOptions: { modifier: modifier },
    onAttach: function(worker) {
      worker.port.on("click", onClick);
    }
  });
}

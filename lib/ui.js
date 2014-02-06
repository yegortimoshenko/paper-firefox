let { setTimeout } = require('sdk/timers');
var { PageMod } = require("sdk/page-mod");
var { Hotkey } = require("sdk/hotkeys");

var data = require("sdk/self").data;
var ui = require("sdk/ui");

exports['createButton'] = createButton;
exports['updateSuccess'] = updateSuccess;
exports['createHotkey'] = createHotkey;
exports['injectListener'] = injectListener;

// Creates an Instapaper button which does the specified
// action when is pressed (i.e. clicked on).
//
function createButton(onClick) {
  return ui.ActionButton({
    id: "paper-button",
    label: "Send to Instapaper",
    icon: "./default.png",
    onClick: onClick
  });
}

// Returns a function that returns the icon on the button
// into its default state.
//
function updateDefault(button) {
  return function () {
    button.state("window", {icon: "./default.png"});
  }
}

// Returns a function that changes the icon on the button
// into its success state.
//
function updateSuccess(button) {
  return function () {
    button.state("window", {icon: "./success.png"});
    setTimeout(updateDefault(button), 1400);
  };
}

// exports['wait'] = wait;
// function wait(button, ord) {
//   button.state("window", {icon: "./loading/" + ord + ".png"});
//   setTimeout(function(){ wait(button, (ord + 1) % 8)}, 100);
// }

// Creates a Hotkey handler which does the specified action
// when the specified combination of keys is pressed.
//
function createHotkey(combo, onPress) {
  Hotkey({
    combo: combo,
    onPress: onPress
  });
}

// Inject a listener JS to all pages. It activates only at given
// key combination. See data/listener.js for the rest of the code.
//
function injectListener(modifier, onClick) {
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

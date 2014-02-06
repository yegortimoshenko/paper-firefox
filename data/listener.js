function listener(event) {
  var link = event.target;
  while (link && link.localName != "a")
    link = link.parentNode;

  if (link) {
    self.port.emit("click", link.href);
    event.preventDefault();
  }
}

var checkModifier = function(modifier) {
  switch (modifier) {
    case "alt":   return function (e) { return e.altKey }
    case "ctrl":  return function (e) { return e.ctrlKey }
    case "shift": return function (e) { return e.shiftKey }
    case "cmd":   return function (e) { return e.metaKey }
  }
}(self.options.modifier);

window.addEventListener("keydown", function(event) {
  if (checkModifier(event))
    window.addEventListener("click", listener, false);
});

window.addEventListener("keyup", function(event) {
  if (!checkModifier(event))
    window.removeEventListener("click", listener, false);
});

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
    case "S":  return function (e) { return e.shiftKey }
    case "C":  return function (e) { return e.ctrlKey }
    case "CS": return function (e) { return e.ctrlKey && e.shiftKey }
    case "CA": return function (e) { return e.ctrlKey && e.altKey }
    case "A":  return function (e) { return e.altKey }
    case "AS": return function (e) { return e.altKey && e.shiftKey }
    case "AC": return function (e) { return e.altKey && e.ctrlKey }
    case "M":  return function (e) { return e.metaKey }
    case "MS": return function (e) { return e.metaKey && e.shiftKey }
    case "MC": return function (e) { return e.metaKey && e.ctrlKey }
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

function emit(event) {
  var link = event.target;
  while (link && link.localName !== 'a')
    link = link.parentNode;

  if (link) {
    self.port.emit('click', link.href);
    event.preventDefault();
  }
}

let isModifierPressed = {
  'S':  function(e) { return e.shiftKey },
  'A':  function(e) { return e.altKey },
  'AC': function(e) { return e.altKey && e.ctrlKey },
  'AS': function(e) { return e.altKey && e.shiftKey },
  'C':  function(e) { return e.ctrlKey },
  'CA': function(e) { return e.ctrlKey && e.altKey },
  'CS': function(e) { return e.ctrlKey && e.shiftKey },
  'M':  function(e) { return e.metaKey },
  'MC': function(e) { return e.metaKey && e.ctrlKey },
  'MS': function(e) { return e.metaKey && e.shiftKey }
}[self.options.modifier];

window.addEventListener('keydown', function(event) {
  if (isModifierPressed(event)) window.addEventListener('click', emit);
});

window.addEventListener('keyup', function(event) {
  if (!isModifierPressed(event)) window.removeEventListener('click', emit);
});

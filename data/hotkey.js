function suppress(event) { event.preventDefault() }

window.addEventListener('keydown', suppress);

function emit(event) {
  event.preventDefault();

  let hotkey = '';
  if (event.ctrlKey) hotkey = 'ctrl-';
  if (event.altKey) hotkey = hotkey + 'alt-';
  if (event.metaKey) hotkey = hotkey + 'meta-';
  if (event.shiftKey && hotkey) hotkey = hotkey + 'shift-';

  if (hotkey || event.keyCode === 27 || event.keyCode === 13) {
    if (hotkey) {
      hotkey = hotkey + String.fromCharCode(event.keyCode).toLowerCase();
      self.port.emit('press', hotkey);
    }
    window.removeEventListener('keydown', suppress);
    window.removeEventListener('keyup', emit);
    self.port.emit('stop');
  }
}

window.addEventListener('keyup', emit);

self.on('click', function(node) {
  while (node && node.localName !== 'a')
    node = node.parentNode;

  if (node) self.postMessage(node.href);
});

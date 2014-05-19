exports.preprocess = function(url) {
  return facebook(url);
}

function facebook(url) {
  if (url.indexOf("facebook.com/l.php?u=") == -1) {
    return url;
  } else {
    return url.replace(/https?:\/\/(www\.|l\.)?facebook\.com\/l\.php\?u=/, '');
  }
}

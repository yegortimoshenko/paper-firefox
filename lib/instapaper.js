// See: https://www.instapaper.com/api/simple

let domain = 'https://www.instapaper.com';
let request = require('sdk/request');

// Adds given URL to given Instapaper account.
// Calls function onSuccess on success.
exports.add = function(username, password, url, onSuccess) {
  if (url.indexOf('facebook.com/l.php?u=') === 0) {
    url = url.replace(/https?:\/\/(www\.|l\.)?facebook\.com\/l\.php\?u=/, '');
  }

  request.Request({
    url: domain + '/api/add',
    content: {
      username: username,
      password: password,
      url: url
    },
    onComplete: function(response) {
      if (response.status.toString()[0] === '2') onSuccess()
    }
  }).get();
}

const axios = require('axios');

module.exports.post = function (url, body, bodyEncoding) {
  return new Promise((resolve, reject) => {
    axios.post(url, body, {
      headers: {
        'Content-Type': `application/${bodyEncoding === 'json' ? 'json' : 'x-www-form-urlencoded'}`
      }
    }).then(res => resolve(res.data)).catch(reject);
  })
};

module.exports.get = function (url) {
  return new Promise((resolve, reject) => {
    axios.get(url).then(res => resolve(res.data)).catch(reject);
  })
};

var request  = require('request')

exports = function checkUser () {
  var options = {
        url      : 'https://en.reddit.com/api/me.json',
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : modhash,
            'Cookie' : 'reddit_session=' + encodeURIComponent(cookie)
          },
        method : 'GET',
      };

  request(options, function (err, res, body) {
    if (err) {
      console.error('REQUEST ERROR', err);
      return;
    } else {
      console.log('\n// ------ //', body, '// ------ //\n');
    }
  });
};

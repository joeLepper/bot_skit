exports = function postComment (message, user, success) {
  console.log('calling to post a comment.');
  var options  = {
        url      : 'https://en.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(message.text) + '&thing_id=' + message.parent,
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : user.modhash,
            'Cookie' : 'reddit_session=' + encodeURIComponent(user.cookie)
          },
        method : 'POST'      };

  // request(options, function (err, res, body) {
  //   if (err) {
  //     console.error('COMMENT ERROR:', err.stack);
  //     return;
  //   } else {
  //     console.log('\n// ------ //', body, '// ------ //\n');
  //   }
  // });
};

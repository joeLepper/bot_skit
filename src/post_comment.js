var header = require('./bots').getHeader()

exports = function postComment (message, user, success) {
  console.log('calling to post a comment.')
  var options  = {
        url      : 'https://en.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(message.text) + '&thing_id=' + message.parent,
        headers  : {
            'User-Agent' : header,
            'X-Modhash'  : user.modhash,
            'Cookie' : 'reddit_session=' + encodeURIComponent(user.cookie)
          },
        method : 'POST' }
}

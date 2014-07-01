var request     = require('request')
  , checkErrors = require('./error_handler')
  , header      = require('./bots').getHeader()

module.exports = function login (user, header, storeCredentials) {
  var options = { url     : 'https://ssl.reddit.com/api/login?api_type=json&user=' + user.name + '&passwd=' + user.pass + '&rem=True'
                , headers : { 'User-Agent' : header }
                , method  : 'POST' }

  request(options, function (err, res, body) {
    if (checkErrors(err, 'LOGIN ERROR:')) { return }
    console.log('LOGGED IN.', body)
    var parsedBody = JSON.parse(body)

    user.cookie  = 'reddit_session=' + encodeURIComponent(parsedBody.json.data.cookie)
    user.modhash = parsedBody.json.data.modhash


    storeCredentials(user)
  })
}

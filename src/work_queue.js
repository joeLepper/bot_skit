var next              = require('./message_queue').next
  , request           = require('request')
  , pg                = require('pg')
  , connectionOptions = require('./connection')
  , header            = require('./bots').getHeader()

module.exports = function () {
  var message = next() // get the next messageTuple
  if (message && message.length) postComment(message)
}

function postComment (message) {
  console.log('POSTING', message)
  var text = message[2] ? message[2] : message[1].message
    , options  = {
        url     : 'https://en.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(text) + '&thing_id=' + message[0],
        headers : {
            'User-Agent' : header,
            'X-Modhash'  : message[1].modhash,
            'Cookie'     : message[1].cookie
          },
        method : 'POST'
      }

  console.log(message[1].modhash, message[1].cookie, message[1].message, message[0])

  request(options, function (err, res, body) {
    // console.log(res)
    console.log('STATUS: ' + res.statusCode)
    if (res.headers['content-type'] === 'application/json charset=UTF-8') {
      body = JSON.parse(body)
      if (err) {
        console.log('COMMENT ERROR:')
        console.log(err.stack)
        return
      } else if (body.json && body.json.errors && body.json.errors.length) {
        console.log(body.json.errors)
        return
      } else {
        console.log('\n// ------ //\n', body, '\n// ------ //\n')
        storeComment(body.json.data.things[0].data.id, message[1].name)
      }
    } else {
      console.log('\n// ------ //\nFORBIDDEN\n// ------ //\n' + body + '\n// ------ //\nFORBIDDEN\n// ------ //\n')
    }
  })
}

function storeComment (messageId, botName) {
  console.log('\n// ---- // TRYING TO CREATE IN DATABASE // ---- //', messageId, botName)
  pg.connect(connectionOptions, function (err, client, done) {
    if (err) {
      console.log(err)
      return
    }
    var query = client.query('INSERT INTO bot_skit (message_id, bot) VALUES (\'' + messageId + '\', \'' + botName + '\');')
      , account

    query.on('error', function (err) { console.error('DATABASE ERROR:', err) })
    query.on('end',   function () {
      console.log('SUCCESS?')
      done()
    })
  })
}

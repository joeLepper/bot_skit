var pg                = require('pg')
  , request           = require('request')
  , handleErrors      = require('./error_handler')
  , contains          = require('./target_contain')
  , queue             = require('./message_queue')
  , bots              = require('./bots')
  , connectionOptions =  require('./connection')

var foundReplies = []

setInterval(checkReplies, 100)

module.exports = function (inbound) {
  for (var i = 0; i < inbound.length; i++) {
    findResponse(inbound[i])
    checkBots(inbound[i], bots.parents())
  }
}

function findResponse (message) {
  pg.connect(connectionOptions, function (err, client, done) {
    if (err) {
      console.log(err)
      return
    }
    var query = client.query('SELECT * FROM bot_skit WHERE message_id=\'' + message.data.parent_id + '\';')
      , account

    query.on('error', function (err) { console.error('DATABASE ERROR:', err) })
    query.on('row',   function (row) {
      console.log('FOUND A REPLY')
      foundReplies.push(message)
    })
    query.on('end',   function () { done() })
  })
}

function checkReplies () {
  while (foundReplies.length) { checkBots(foundReplies.pop(), bots.children()) }
}

function checkBots (inbound, bots) {
  if (bots.length) {
    for (var i = 0; i < bots.length; i++) {
      contains(inbound.data, bots[i])
    }
  }
}

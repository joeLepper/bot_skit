var enqueue = require('./message_queue').enqueue

module.exports = function contains (inbound, bot) {
  var strings = bot.filter.keywords
  for (var j = 0; j < strings.length; j++) {
    if (inbound.body.indexOf(strings[j]) !== -1) {
      enqueue(inbound.name, bot)
    }
  }
}

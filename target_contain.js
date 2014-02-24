var enqueue = require('./message_queue').enqueue;

module.exports = function contains (message, bot) {
  console.log(bot);
  var strings = bot.filter.keywords;
  for (var j = 0; j < strings.length; j++) {
    // console.log('\n // ==== inside contains loop ==== //\n');
    // console.log(message);
    if (message.body.indexOf(strings[j]) !== -1) {
      enqueue(message.name, bot);
    }
  }
};

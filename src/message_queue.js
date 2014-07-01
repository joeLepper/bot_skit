var messages = []

exports.enqueue = function (inbound, bot) {
  // storing these as tuples right now, because why not?
  // might want to make them into objects later on to be
  // more explicit
  if (typeof bot.message !== 'undefined') {
    var messageTuple = [inbound, bot]
    console.log('\n // ---- enqueuing ---- // \n')
    console.log(messageTuple)
    messages.push(messageTuple)
  }
  else require('../actions/' + bot.name)(inbound, bot, function (outbound) { messages.push(outbound) })
}

exports.next = function () {
  console.log(messages)
  return messages.pop()
}
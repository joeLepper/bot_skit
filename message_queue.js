var messages = [];

exports.enqueue = function (message, bot) {
  // storing these as tuples right now, because why not?
  // might want to make them into objects later on to be
  // more explicit
  var messageTuple = [message, bot];
  console.log('\n // ---- enqueuing ---- // \n');
  console.log(messageTuple)
  messages.push(messageTuple);
}

exports.next = function () {
  return messages.pop();
}
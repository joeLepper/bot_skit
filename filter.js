var pg           = require('pg')
  , request      = require('request')
  , handleErrors = require('./error_handler')
  , contains     = require('./target_contain')
  , queue        = require('./message_queue')
  , bots         = require('./bots');

var foundReplies = []
  , conString    = 'postgres://jlepper:5432@localhost/jlepper';

setInterval(checkReplies, 100);

module.exports = function (inbound) {
  // console.log('filtering');
  for (var i = 0; i < inbound.length; i++) {
    // console.log('// ---------------------------- //');
    // console.log(inbound[i].data.body);

    findResponse(inbound[i]);
    checkBots(inbound[i], bots.parents());
  }
};

function findResponse (message) {
  pg.connect(conString, function (err, client, done) {
    if (err) {
      console.log(err);
      return;
    }
    var query = client.query('SELECT * FROM bot_skit WHERE message_id=\'' + message.data.parent_id + '\';')
      , account;

    query.on('error', function (err) { console.error('DATABASE ERROR:', err); });
    query.on('row',   function (row) {
      console.log('FOUND A REPLY');
      foundReplies.push(message);
    });
    query.on('end',   function () { done(); });
  });
}

function checkReplies () {
  while (foundReplies.length) { checkBots(foundReplies.pop(), bots.children()); }
}

function checkBots (inbound, bots) {
  // console.log(bots);
  if (bots.length) {
    for (var i = 0; i < bots.length; i++) {
      contains(inbound.data, bots[i]);
    }
  }
}

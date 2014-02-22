var next              = require('./message_queue').next
  , request           = require('request')
  , pg                = require('pg')
  , connectionOptions = require('./connection');

module.exports = function () {
  var message = next();
  if (message && message.length) { postComment(message); }
};

function postComment (message) {
  console.log('POSTING', message);
  var options  = {
        url      : 'https://en.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(message[1].message) + '&thing_id=' + message[0],
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : message[1].modhash,
            'Cookie'     : message[1].cookie
          },
        method : 'POST'
      };

  console.log(message[1].modhash, message[1].cookie, message[1].message, message[0]);

  request(options, function (err, res, body) {
    console.log(res.statusCode);

    body = JSON.parse(body);

    // console.log('\n// ------ //');
    // console.log(typeof body);
    // console.log('// ------ //');
    // console.log('\n// ------ //');
    // console.log(body.json);
    // console.log('// ------ //');
    // console.log('\n// ------ //');
    // console.log(body.json.errors);
    // console.log('// ------ //');
    // console.log('\n// ------ //');
    // console.log(body.json.errors.length);
    // console.log('// ------ //');

    if (err) {
      console.log('COMMENT ERROR:');
      console.log(err.stack);
      return;
    } else if (body.json && body.json.errors && body.json.errors.length) {
      console.log(body.json.errors);
      return;
    } else {
      console.log('// ------ //');
      console.log(body);
      console.log('// ------ //');
      storeComment(body.json.data.things[0].data.id, message[1].name);
    }
  });
}

function storeComment (messageId, botName) {
  pg.connect(connectionOptions, function (err, client, done) {
    if (err) {
      console.log(err);
      return;
    }
    var query = client.query('INSERT INTO bot_skit (message_id, bot) VALUES (\'' + messageId + '\', \'' + botName + '\');')
      , account;

    query.on('error', function (err) { console.error('DATABASE ERROR:', err); });
    query.on('end',   function ()    { done(); });
  });}

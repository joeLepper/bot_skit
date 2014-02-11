var needle   = require('needle')
  , login    = require('./login')
  , read     = require('./comment_reader')

  , youngest = Date.now()
  , argv     = require('yargs').argv
  , modhash
  , cookie
  , credentials = []
  , players  = (
      [ { name : 'SketchNotSkit'
        , pass : 'noskits' }
      , { name : 'a_bit_pedantic'
        , pass : 'pedantic' } ] );


exports.result      = {};
exports.queue       = [];

// start to look for the term 'skit'
setInterval(function() {
  read(function(id) {
    exports.queue.push(id);
  });
}, 2000);
createPlayers(players);

function createPlayers (players) {
  console.log('creating players');
  var numLoggedIn = 1;
  // for each player
  for (var i = 0; i < players.length; i++) {
    login(players[i], function(cred) {
      credentials.push(cred);
      if (numLoggedIn === players.length) {
        setInterval(function() {
          console.log('seeking comments')
          if (exports.queue.length) {
            postSkitComment(exports.queue.shift());
          }
        }, 3000);
        numLoggedIn++;
      }
    });
  }
}

function postSkitComment (id) {
  var text = 'I think you mean [sketch](http://en.wikipedia.org/wiki/Sketch_comedy).'
  postComment( { parent : id, text : text }, credentials[0], postPedantComment);
}

function postPedantComment (id) {
  var nextText = "You'll have to excuse SketchNotSkit's [pedanticism](http://en.wikipedia.org/wiki/Pedant)."
  postComment({ parent : id, text : text }, credentials[1], function(id){
    console.log('Sequence ' + id + ' posted.');
  })
}


// and push messages into the queue



// message : {
//   parent  : ID
//   message : String
// }
var needle      = require('needle')
  , checkErrors = require('./error_handler')
  , bots        = require('./bots')
  , before       = ''
  , found       = [];

module.exports = function readComments (success) {
  var mindate = (typeof youngest === 'undefined') ? '' : '?mindate=' + youngest
    , cookie  = bots.parents(0).cookie;

  if (typeof cookie === 'undefined') {
    return;
  }
  else {
    needle.get('http://api.reddit.com/r/all/comments?limit=100&sort=new' + before, {
      headers : {
        'user-agent' : 'bot_skit 0.1 by bot_test_acct',
        'cookie'     : cookie
      }
    }, function (err, res, body) {
      if (checkErrors(err, 'READ ERROR:')) { return; }
      if (body && body.data  && body.data.children) {
        console.log(body.data.children.length + ' NEW ENTRIES');
        if (body.data.children.length) {
          before = '&before=' + body.data.children[0].data.name;
          success(body.data.children);
        }
      }
      else { console.log('SOMETHING IS WRONG WITH THIS RESPONSE'); }
    });
  }
};

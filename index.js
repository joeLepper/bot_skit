var needle   = require('needle')
  , request  = require('request')
  , strings  = [' skit ', ' skits ']
  , youngest = Date.now()
  , argv     = require('yargs').argv
  , modhash
  , cookie;

exports.result      = {};
exports.queue       = [];
exports.found       = [];
exports.login       = login;
exports.workQueue   = workQueue;
exports.postComment = postComment;
exports.fetch       = fetchComments;
exports.checkUser   = checkUser;

request.defaults({jar:true});
exports.login();
setInterval(exports.fetch, 2000);

function targetsContain (targets) {
  for (var i = 0; i < targets.length; i++) {
    for (var j = 0; j < strings.length; j++) {
      if (targets[i].indexOf(strings[j]) !== -1) {
        return true;
      }
    }
  }
  return false;
}

function postComment (parentId) {
  var text     = 'I think you mean [sketch](http://en.wikipedia.org/wiki/Sketch_comedy).'
    , options  = {
        url      : 'https://en.reddit.com/api/comment?api_type=json&text=' + encodeURIComponent(text) + '&thing_id=' + parentId,
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : modhash,
            'Cookie' : 'reddit_session=' + encodeURIComponent(cookie)
          },
        method : 'POST'      };

  request(options, function (err, res, body) {
    if (err) {
      console.log('caught an error posting a comment, here\'s the hash:');
      console.log(err.stack);
      return;
    } else {
      console.log('// ------ //');
      // console.log(body);
      console.log('// ------ //');
    }
  });
}

function checkUser () {
  var options = {
        url      : 'https://en.reddit.com/api/me.json',
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : modhash,
            'Cookie' : 'reddit_session=' + encodeURIComponent(cookie)
          },
        method : 'GET',
      };

  request(options, function (err, res, body) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('// ------ //');
      console.log(body);
      console.log('// ------ //');
    }
  });
}


function workQueue () {
  if (exports.queue.length) {
    postComment(exports.queue.shift());
  }
}

function login () {
  var options = {
      url     : 'https://ssl.reddit.com/api/login?api_type=json&user=' + argv.user + '&passwd=' + argv.pass + '&rem=True',
      headers : {
        'User-Agent' : 'skitBot/0.1 by SketchNotSkit'
      },
      method  : 'POST'
  };

  request(options, function (err, res, body) {
    if (err) {
      console.log('caught an error logging in, here\'s the hash:');
      console.log(err.json.errors);
      return;
    } else {
      var parsedBody = JSON.parse(body);
      modhash = parsedBody.json.data.modhash;
      cookie  = parsedBody.json.data.cookie;
      setInterval(exports.workQueue, 3000);
    }
  });
}

function fetchComments () {
  var mindate = (typeof youngest === 'undefined') ? '' : '&mindate=' + youngest;
  needle.get( 'http://api.redditanalytics.com/getRecent.php?limit=500', {timeout: 5000}, function (err, res, body) {
    if (err){
      console.log('caught an error fetching comments, here\'s the hash:');
      console.log(err.stack);
      return;
    }
    exports.result = body;
    youngest       = body.metadata.newest_date;

    for (var i=0; i < body.data.length; i++) {
      var targets = [ body.data[i].body.toLowerCase() ]
        , id      = body.data[i].name;

      if(body.data[i].name) {
        targets.push(body.data[i].name.toLowerCase());
      }

      if( targetsContain(targets) && exports.found.indexOf(id) === -1) {
        console.log(body.data[i].body);

        exports.queue.push(id);
        exports.found.push(id);
      }
    }
    console.log(exports.queue);
 });
}
var parentBots = []
  , childBots  = [];

exports.parents = function (index) {
  if (typeof index === 'undefined') { return parentBots; }
  return parentBots[index];
};

exports.children = function (index) {
  if (typeof index === 'undefined') { return childBots; }
  return childBots[index];
};

exports.register = function (bot) {
  console.log('\n// --------- REGISTERING ------------// \n');
  console.log(bot);
  if (bot.isParent) { parentBots.push(bot); }
  else              { childBots.push(bot);  }
};

exports.check = function () {
  var options = {
        url      : 'https://en.reddit.com/api/me.json',
        headers  : {
            'User-Agent' : 'skitBot/0.1 by SketchNotSkit',
            'X-Modhash'  : childBots[0].modhash,
            'Cookie' : childBots[0].cookie
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
};
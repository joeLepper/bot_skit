var fetch        = require('./fetcher')
  , filter       = require('./filter')
  , work         = require('./work_queue')
  , login        = require('./login')
  , register     = require('./bots').register
  , yaml         = require('js-yaml')
  , fs           = require('fs')
  , botInits     = yaml.safeLoad(fs.readFileSync('bots.yaml', 'utf8'));

console.log(botInits);

setInterval(function () {
  fetch(function (comments) {
    if (comments && comments.length) { filter(comments); }
  });
}, 2500);

setInterval(work, 4000);

function createBots () {
  for(var i = 0; i < botInits.length; i++) {
    login(botInits[i], register);
  }
}



createBots();

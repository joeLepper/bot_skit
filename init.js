var fetch    = require('./fetcher')
  , filter   = require('./filter')
  , work     = require('./work_queue')
  , login    = require('./login')
  , register = require('./bots').register
  , yaml     = require('js-yaml')
  , fs       = require('fs')
  , bots     = yaml.safeLoad(fs.readFileSync('bots.yml', 'utf8'));

console.log(bots);

setInterval(function () {
  fetch(function (comments) {
    if (comments && comments.length) { filter(comments); }
  });
}, 2500);

setInterval(work, 4000);

function createBots () {
  for(var i = 0; i < bots.length; i++) {
    login(bots[i], register);
  }
}

createBots();

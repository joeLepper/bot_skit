var fetch     = require('./src/fetcher')
  , filter    = require('./src/filter')
  , work      = require('./src/work_queue')
  , login     = require('./src/login')
  , register  = require('./src/bots').register
  , setHeader = require('./src/bots').setHeader
  , yaml      = require('js-yaml')
  , fs        = require('fs')
  , config    = yaml.safeLoad(fs.readFileSync('bots.yml', 'utf8'))
  , bots      = config.bots
  , header    = config.header

console.log(bots)

setInterval(function () {
  fetch(function (comments) {
    if (comments && comments.length) { filter(comments) }
  })
}, 2500)

setInterval(work, 4000)
setHeader(header)
for(var i = 0; i < bots.length; i++) {
  login(bots[i], header, register)
}

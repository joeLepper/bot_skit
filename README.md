# Skit Bot

## I think you mean [sketch](http://en.wikipedia.org/wiki/Sketch_comedy).

To run an instance of skitbot simply (make sure that you have node installed):

1. clone this repo
2. run `npm install`
3. `node index.js --user=USERNAME --pass=PASSWORD

## altering the bot's behavior

At its heart skitBot is a bot which pores over the comments that come into Reddit and watches for the strings `' skit '` and `' skits '`, then responds with `'I think you mean [sketch](http://en.wikipedia.org/wiki/Sketch_comedy)'`. If your bot has similar behavior, feel free to fork the repo and alter these strings to your heart's content.
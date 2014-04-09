# `bot_skit`

`bot_skit` is a jumping-off-point for building complex interactions with strangers on Reddit. Through its use, you are able to watch Reddit's stream of comments and react to certain phrases by posting replies.  You may also watch for and respond to direct replies to your previous comments.

Please use it for good.

## installation

`bot_skit` is simple to set up.

1. ensure that node is [installed](http://thechangelog.com/install-node-js-with-homebrew-on-os-x/)
2. clone this repo
2. run `npm install`
3. setup a `bots.yml`
4. `node init.js`

## `bots.yml`

To use `bot_skit` you must specify a `bots.yml` file. `bots.yml` defines a list of `bot` objects which each look for and respond with a particular type of message. A `bot` object looks like this:

```yaml

- name: BillyPilgrim
  pass: pooteeweet
  message: [So it goes.](http://en.wikipedia.org/wiki/billy_pilgrim).
  isParent: true
  filter:
    parent: hunter
    keywords:
      - 'kilgore'
      - 'trout'

```

If you're not familiar with yaml, you'll be defining an array of objects that look like this:

```javascript

[{
  name     : String,
  pass     : String,
  message  : String<Markdown>,
  isParent : Boolean(optional),
  filter   : {
    parent   : String(optional),
    keywords : [String]
  }
}]

A `bot_skit` requires one parent bot and may contain any number of children, grand children, et cetera

### `name`

`name String` the account that `bot_skit` will log in as to send the associated message. You'll have to have previously set up this account.

### `pass`

`pass String` the password associated with `name`

### ` message`

`message String` a string of markdown that describes the comment to be posted

### isParent

`isParent Boolean` an optional parameter describing whether or not the `bot` has any children watching for its replies. Defaults to `false`.

### filter

`filter Object` describes the type of comments that a `bot` will respond to. It contains one `keyword` and one optional `parent` param.

* `keywords` is a list of strings to watch for
* `parent` is an optional String which matches another bot in the troupe

## messages


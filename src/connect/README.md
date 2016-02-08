# B9 Connect Module
Connect to the [slack real-time messaging api](https://api.slack.com/methods/rtm.start).

## Options

- `interval` {Number} `5000`
The idle duration in milliseconds between socket pings.

## Methods

#### `b9.start( callback )`

Call slack `rtm.start` and then open a websocket and listen for json.

- `callback ( err, msg )` {function}
Error-first style callback which is fired after the rtm socket is opened.

#### `b9.stop()`
Close any open websocket, stop listening.

#### `b9.send( msg )`

Send json to the slack rtm socket.

- `msg` {object}
A message object to send as json to the rtm socket.
https://api.slack.com/rtm#sending_messages

## Events
Here are some useful events that are emitted by this module.

#### `"rtm.start"`
Emitted when a rtm socket is successfully requested.
https://api.slack.com/methods/rtm.start

#### `"rtm.send"`
Emitted when json is sent to the rtm socket. Useful for logging.

#### `"rtm.read"`
Emitted when any json is received from the rtm socket. Useful for logging.

#### `"message"` etc.
Any event type recieved from the rtm socket is emitted as an event.
https://api.slack.com/rtm#events

## Listeners

Listeners to socket events (not "rtm." events) are passed two arguments: the
json recieved from the socket, and a function which accepts a text string and
sends a message back to the same channel.

## Example
```js
b9.on("message",function( msg, reply ){
  if ( msg.text == "PING" ){
    reply("PONG");
  }
});
```

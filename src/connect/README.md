# B9 Connect Module
Connect to the [slack real-time messaging api](https://api.slack.com/methods/rtm.start).

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

#### `"rtm.start"`
Emitted when a rtm socket is successfully requested.
https://api.slack.com/methods/rtm.start

#### `"rtm.send"`
Emitted when json is sent to the rtm socket.
https://api.slack.com/rtm#sending_messages

#### `"rtm.read"`
Emitted when json is received from the rtm socket.
https://api.slack.com/rtm#events

# B9 Connect Module
Connect to the slack real-time messaging api.

## Methods

- `start()`
Call slack `rtm.start` and then open a websocket and listen to messages.

- `stop()`
Close any open websocket, stop listening to messages.

- `send( msg )`
Send a slack rtm-api message object.

## Events

- `"rtm.start"`
- `"rtm.send"`
- `"rtm.read"`
- `"message"`


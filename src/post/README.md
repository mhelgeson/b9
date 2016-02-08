# B9 Post Module
Make authenticated web-api requests. Configuration options should be passed into
the `b9` constructor.

## Options

- `token` {Sting} `null`
A slack bot api auth token.

- `host` {String} `"api.slack.com"`
The host to which requests are sent. Useful for testing.

- `path` {String} `"api"`
The path to which requests are sent. Useful for testing.

- `port` {Number} `null`
The port number to which requests are sent. Useful for testing.

## Methods

#### `b9.post( method, params, callback )`
Make a slack web-api request.

- `method` {String}
The name of the web-api method to call.

- `params` {Object}
Parameters to pass to the web-api method.

- `callback` {Function}
Error-first style callback to handle the api response.

## Events
In addition to callbacks, events are emitted for all successful `b9.post`
web-api requests.



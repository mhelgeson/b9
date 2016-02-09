# B9 Post Module
Make authenticated web-api requests. Configuration options should be passed into
the `b9` constructor. https://api.slack.com/methods

## Options

- **`token`** *`{String}`* `null` <br />
A slack bot api auth token. Error is thrown if this is null.

- **`host`** *`{String}`* `"api.slack.com"` <br />
The host to which requests are sent. Useful for testing.

- **`path`** *`{String}`* `"api"` <br />
The path to which requests are sent. Useful for testing.

- **`port`** *`{Number}`* `null` <br />
The port number to which requests are sent. Useful for testing.

## Methods

#### `b9.post( method, params, callback )`
Make a slack web-api request.

- **`method`** *`{String}`* <br />
The name of the web-api method to call.

- **`params`** *`{Object}`* <br />
Parameters to pass to the web-api method.

- **`callback`** *`{Function}`* <br />
Error-first style callback to handle the api response.

## Events
In addition to callbacks, events are emitted for all successful `b9.post`
web-api requests.


## Example
```js
// formatted attachment, https://api.slack.com/docs/attachments
b9.post("chat.postMessage",{
  channel: "C1234567890",
  attachments: [{
    "fallback": "Required plain-text summary of the attachment.",
    "color": "#36a64f",
    "pretext": "Optional text that appears above the attachment block",
    "title": "Slack API Documentation",
    "title_link": "https://api.slack.com/",
    "text": "Optional text that appears within the attachment",
    "fields": [{
      "title": "Priority",
      "value": "High",
      "short": false
    }],
  }]
},function( err, msg ){
  if ( !err && msg.ok ){
    // it worked!
  }
});
```

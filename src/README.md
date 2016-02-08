# B9 Module
Instantiates and runs the b9 bot.

## Quick Start
Require the `b9` module and invoke it with the api token.

```js
require("b9")("SLACK_API_TOKEN");
```

## Advanced Usage
Require the `b9` module and instantiate it with options.

```js
// load module
var B9 = require('b9');

// instantiate and configure
var b9 = new B9({
  token: "SLACK_API_TOKEN",
  // other options...
});

// include additional modules
b9.install('./path/to/plugin');

// include additional listeners
b9.on('rtm.send',function(){
  // do something
});

// connect to remote
b9.start();
```


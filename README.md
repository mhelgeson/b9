# B9 Class M3 General Utility Non-Theorizing Environmental Control Robot
Also an event-based, modular slack bot framework for node/npm.

## Features
- uses slack's real time messaging api
- modular plugins auto-installed from dependencies
- web api and rtm api emitted as events

## Installation
Install the `b9` class module as a dependency in your project.

```js
npm install b9 --save
```

## Quick Start
Require the `b9` module and invoke it with the api token.

```js
require("b9")("SLACK_API_TOKEN");
```

## Core Modules

- [command](./src/command/README.md)
- [connect](./src/connect/README.md)
- [events](./src/events/README.md)
- [install](./src/install/README.md)
- [post](./src/post/README.md)

## Advanced Usage

```js
// load dependencies
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

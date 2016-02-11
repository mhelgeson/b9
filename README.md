# B9
[![NPM](https://nodei.co/npm/b9.png?compact=true)](https://nodei.co/npm/b9/)<br />
[![Build Status](https://travis-ci.org/mhelgeson/b9.svg?branch=master)](https://travis-ci.org/mhelgeson/b9)
[![Coverage Status](https://coveralls.io/repos/github/mhelgeson/b9/badge.svg?branch=master)](https://coveralls.io/github/mhelgeson/b9?branch=master)
- - -
An event-based, modular slack bot framework.

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

## Modules
- [main](./src)
- [command](./src/command)
- [connect](./src/connect)
- [events](./src/events)
- [install](./src/install)
- [post](./src/post)

---

`Class M3 General Utility Non-Theorizing Environmental Control Robot`

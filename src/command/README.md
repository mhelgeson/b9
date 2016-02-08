# B9 Command Module

Declare simple keyword based callbacks. This module only detects commands from
direct messages or direct mentions in public channels or private groups.

## Methods

#### `b9.command( syntax, desc, callback )`

Declare a command listener with specified syntax (defines arguments) and
description (shown in help).

- `syntax` {string}
A literal string that defines the command keyword and any `[optional]` or
`<required>` argument names.

- `desc` {string}
A simple description of the command, which can be displayed with from `help`
command.

- `callback( msg, reply )` {function}
A callback function which is invoked when a direct message or mention matches
the declared command syntax.

## Arguments

The arguments passed to a command are stored on the `msg` object in the `argv`
property. This is an array containing an item for each word of the parsed
command. The first entry `msg.argv[0]` is the name of the command itself. Named
arguments that are declared in the command syntax are given named properties on
the `argv` array. In the example that follows, `msg.argv.a` is equal to
`msg.argv[1]`.

## Example

```js
b9.command(
  // syntax: arg "a" is required, "b" is optional
  'sum <a> [b]',
  // desc: displayed in help command
  'add numbers',
  // callback: msg object with "argv" property
  function( msg, reply ){
    reply( msg.argv.a + ( msg.argv.b || 0 ) );
  }
);
```

## Commands

#### `help [cmd]`
List available commands, syntax and description.

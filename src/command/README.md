# B9 Command Module

Declare simple keyword based callbacks. B9 only detects commands from direct
messages or direct mentions in public channels or private groups.

## Methods

- `command( syntax, desc, callback )`
Declare a command listener with specified syntax (defines arguments) and
description (shown in help).

## Commands

- `help [cmd]`
List available commands, syntax and description.

## Examples

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

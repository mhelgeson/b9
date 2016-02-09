# B9 Install Module
When this module is loaded in the b9 constructor, it auto-loads plugin modules
from `dependencies` in the main `package.json`.

## Options

- **`pattern`** *`{RegExp}`* `/b9-/` <br />
Package naming pattern which should be auto-loaded.

- **`package`** *`{String}`* `"./package.json"` <br />
Path to the `package.json` from which to install plugins from `dependencies`.

## Methods

#### `b9.install( module )`
Install a new plugin module on the `b9` instance.

- **`module`** *`{String|Function}`* <br />
A module name or path or the module itself.

## Plugins

A plugin module must export a function. Installing the plugin module means
invoking it with the `b9` instance. Any configurable options will be assigned an
underscore prefix. The default values of any options should be handled inside
the plugin module. Plugins should be named according to the naming pattern.

## Example

```js
// a sample plugin module
module.exports = function( b9 ){
  // default value for option "foo"
  if ( b9._foo == null ){
    b9._foo = 123;
  }
  // set a public method
  b9.doFoo = function(){
    return b9._foo;
  };
};
```

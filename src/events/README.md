# B9 Events Module
Manage event listeners on the `b9` instance.

## Methods

#### `b9.on( event, listener )`

Adds a listener to the list of listeners for this event.

- **`event`** *`{String}`* <br />
The name of the event.

- **`listener`** *`{Function}`* <br />
A callback to be invoked when the named event is emitted.

#### `b9.off( event, listener )`

Removes listener(s) from the list of listeners for this event.

- **`event`** *`{String}`* <br />
The name of the event.

- **`listener`** *`{Function}`* <br />
A callback which can be matched exactly for removal.


#### `b9.emit( event [,arg1] [,arg2] [,...] )`

Triggers the list of listeners, with arguments, for this event.

- **`event`** *`{String}`* <br />
The name of the event.

- **`arg1, arg2, ...`** *`{Any}`* <br />
Optional argument(s) to pass into `listener` callbacks.

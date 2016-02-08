var slice = Array.prototype.slice;

/** @public module */
module.exports = function( b9 ){

  /**
   * @private cache
   */
  var events = Object.create( null );

  /**
   * register event listeners
   * @public method
   */
  b9.on = function( type, listener ){
    // initialize a new list of listeners
    if ( events[ type ] == null ){
      events[ type ] = [];
    }
    if ( typeof listener === 'function' ){
      return 0 < events[ type ].push( listener );
    }
  };

  /**
   * deregister event listeners
   * @public method
   */
  b9.off = function( type, listener ){
    if ( events[ type ] != null ){
      var orig = events[ type ].length;
      // clear out handlers, all when listener is undefined
      events[ type ] = events[ type ].filter(function( callback ){
        return listener != null && callback !== listener;
      });
      return orig > events[ type ].length;
    }
  };

  /**
   * trigger event listeners
   * @public method
   */
  b9.emit = function( type ){
    var args = slice.call( arguments, 1 );
    // call regular listeners
    if ( events[ type ] != null ){
      // stop propagating if a handler returns false
      return events[ type ].every(function( callback ){
        return callback.apply( b9, args ) !== false;
      });
    }
  };

};

/** @public class */
module.exports = function B9 ( opts ){
  // invoked as a function...
  if ( !( this instanceof B9 ) ){
    // quick start mode...
    return new B9({ token:opts }).start();
  }
  // iterate each key of the passed options
  Object.keys( opts || {} ).forEach(function( key ){
    // apply the value with an underscore prefix
    this['_'+ key ] = opts[ key ];
  }, this );
  // install core modules
  require('./events')( this );
  require('./post')( this );
  require('./connect')( this );
  require('./command')( this );
  require('./install')( this );
};

/** @public module */
module.exports = function( b9 ){

  var mainreq = require.main.require;

  /**
   * regular expression to match plugins in package dependencies
   * @public option
   */
  b9._pattern = b9._pattern || (/b9-/);

  /**
   * path to the package.json from which to install plugins
   * @public option
   */
  if ( b9._package == null ){
    b9._package = './package.json';
  }

  b9.install = function( pkg ){
    if ( typeof pkg === 'string' ){
      pkg = require( pkg );
    }
    if ( typeof pkg === 'function' ){
      pkg( b9 );
    }
  };

  if ( b9._package ){
    Object.keys( mainreq( b9._package ).dependencies )
      .filter( b9._pattern.test, b9._pattern )
      .forEach( b9.install );
  }

};

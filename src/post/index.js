var path = require('path');
var http = require('http');
var https = require('https');
var querystring = require('querystring');
var unshift = Array.prototype.unshift;

/** @public module */
module.exports = function( b9 ){

  /**
   *
   * @public option
   */
  b9._host = b9._host || "api.slack.com";

  /**
   *
   * @public option
   */
  b9._path = b9._path || 'api';

  /**
   *
   * @public option
   */
  b9._port = b9._port || null;

  /**
   *
   * @public option
   */
  b9._token = b9._token || null;

  /**
   * Make a slack web-api request
   * @public method
   */
  b9.post = function ( method, data, callback ){
    // make the `data` argument optional
    if ( typeof data === 'function' ){
      callback = data;
      data = null;
    }
    // add the configured api token
    data = data || {};
    data.token = b9._token;
    // you're going to need a token
    if ( data.token == null ){
      throw new Error("API `token` is null");
    }
    // serialize the request data
    var payload = querystring.stringify( data );
    // wrap callback with an event emitter
    function handler ( err, data ){
      if ( callback != null ){
        callback.apply( b9, arguments );
      }
      // only emit events when there is no error
      if ( err == null ){
        b9.emit.call( b9, method, data );
      }
    };
    // make a new request instance
    var request = https.request({
      method: 'POST',
      path: path.join('/', b9._path, method ),
      hostname: b9._host,
      port: b9._port,
      rejectUnauthorized: b9._host === 'localhost' ? false : true,
      // content encoding headers
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': payload.length
      }
    }, function( response ){
      // console.log( response );
      if ( response.statusCode !== 200 ){
        var status = http.STATUS_CODES[ response.statusCode ];
        return handler( new Error( status ), {
          ok: false, error: status
        });
      }
      else { // 200/OK statusCode
        var json = '';
        response.on('data', function( chunk ) {
          return json += chunk;
        });
        response.on('end', function() {
          var value = JSON.parse( json );
          return handler( null, value );
        });
      }
    });
    // add an error handler
    request.on('error', function( error ) {
      // console.log( error );
      // console.log( request );
      return handler( error, { ok: false, error: error.errno });
    });
    // send the request
    return request.end( payload );
  };

};

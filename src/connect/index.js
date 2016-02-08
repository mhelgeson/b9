var WebSocket = require('ws');

/** @public module */
module.exports = function( b9 ){

  /**
   * the frequency of socket pings
   * @public option
   */
  b9._interval = b9._interval || 5000;

  /**
   * ref to [active] websocket instance
   * @private
   */
  var ws;

  /**
   * map of pending [sent] messages, by id
   * @private
   */
  var pending = Object.create( null );

  /**
   * unique message id counter
   * @private
   */
  var guid = 1;

  b9.self = {};

  /**
   * authenticate with slack real-time-message api
   * https://api.slack.com/methods/rtm.start
   * @public method
   */
  b9.start = function start ( callback ){
    // handle success handshake...
    function success ( msg ){
      complete( null, msg );
    }
    // handle complete callback...
    function complete ( err, msg ){
      b9.off('hello', success ); // cleanup
      // optional callback, error-first...
      if ( typeof callback == 'function' ){
        callback( err, msg );
      }
    }
    // close prev connection
    b9.stop();
    // handle successful handshake
    b9.on('hello', success );
    // make the connection attempt...
    b9.post('rtm.start', {
      simple_latest: true,
      no_unreads: true
    }, function( err, msg ){
      if ( err == null && msg.ok === true ){
        // slack user settings
        b9.self = msg.self;
        try { // create a new connection
          ws = new WebSocket( msg.url );
        }
        catch ( ex ){ // bad socket input
          return complete( ex );
        }
        // handle socket `error` events, error-first
        ws.on('error', complete );
        // listen to the socket for messages
        ws.on('message', receive );
      }
      // handle connection errors
      else {
        // error-first callback
        complete( err || new Error( msg.error ), msg );
      }
    });
    return b9;
  };

  /**
   * close a websocket
   * @public method
   */
  b9.stop = function stop (){
    if ( ws != null ){
      ws.close();
      ws = null;
    }
  };

  /**
   * send a websocket message
   * @public method
   */
  b9.send = function send ( msg ){
    ping(); // clear/schedule next ping
    // clean up the channel, in case encoded one is passed
    if ( msg.channel ){
      msg.channel = msg.channel.replace(/^<#|>$/g,'');
    }
    msg.id = msg.id || guid++;
    pending[ msg.id ] = msg;
    if ( ws != null ) {
      ws.send( JSON.stringify( msg ) );
      b9.emit('rtm.send', msg );
    }
  };

  /**
   * handle a websocket message
   * @private method
   */
  function receive ( str ){
    ping(); // clear/schedule next ping
    var msg = typeof str === 'string' ? JSON.parse( str ) : str;
    b9.emit('rtm.read', msg, replyTo( null ) );
    // acknowledge that a pending message was sent successfully
    if ( msg.reply_to ){
      delete pending[ msg.reply_to ];
    }
    else if ( msg.type != null ){
      b9.emit( msg.type, msg, replyTo( msg.channel ) );
    }
  };

  /**
   * self-addressed stamped envelope -- for replies
   * @private method
   */
  function replyTo ( channel ){
    return function ( txt ){
      b9.send({ type:'message', channel:channel, text:txt });
    };
  };

  /**
   * keep the connection alive
   * @private method
   */
  function ping (){
    clearTimeout( ping.timer );
    ping.timer = setTimeout(function(){
      b9.send({ type: 'ping', time: Date.now() });
    }, b9._interval );
  };

};

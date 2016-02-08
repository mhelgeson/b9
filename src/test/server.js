var fs = require('fs');
var path = require('path');
var url = require('url');
var https = require('https');
var ws = require('ws');
var listeners = Object.create( null );

// configure ports for http/socket servers
var API_PORT = 8008, SOCKET_PORT = 8088, handler, socket;

// configure SSL for the HTTP server
var options = {
  key: fs.readFileSync( path.join( __dirname, 'server.key') ),
  cert: fs.readFileSync( path.join( __dirname, 'server.crt') )
};

// create the HTTP (web-api) server
var server = https.createServer( options, function( req, res ){
  // parse the request body as url-encoded params
  var data = '?';
  req.on('data', function( chunk ) { return data += chunk; });
  req.on('end', function() {
    var msg = url.parse( data, true ).query;
    // look for a custom handler...
    if ( handler = listeners[ req.url ] ){
      handler.call( this, msg, send );
    }
    // default SUCCESS connection
    else if ( req.url === '/api/rtm.start' ){
      send({ ok: true, self: {}, url: exports.sock }, 200 );
    }
    // default error handler
    else {
      send( null, 404 );
    }
  });
  // send objects as json in the response
  function send ( obj, stat ){
    res.writeHead( stat || 200, { 'Content-Type': 'application/json' });
    res.end( JSON.stringify( obj ) );
  }
});

// export configuration parameters
exports.host = 'localhost';
exports.port = API_PORT;

// the websocket server connect url
exports.sock = 'ws://localhost:'+ SOCKET_PORT +'/';

// start the servers
exports.listen = function(){
  // HTTP listener
  server.listen( API_PORT );
  // WS listener
  socket = new ws.Server({ port: SOCKET_PORT });
  // when a client connects to the socket
  socket.on('connection', function( ws ){

    // send objects as json in the socket
    function send ( obj ){
      ws.send( JSON.stringify( obj ) );
    };

    // handle errors
    ws.on('error',function( err ){
      console.error( err );
    });

    // handle messages
    ws.on('message', function( message ){
      var msg = JSON.parse( message );
      // look for a custom handler...
      if ( handler = listeners[ msg.type ] ){
        handler.call( this, msg, send );
      }
      // handle DEFAULT ping response
      else if ( msg.type === 'ping' ){
        msg.type = 'pong';
        msg.reply_to = msg.id;
        delete msg.id;
        send( msg );
      }
    });

    // complete the handshake
    send({ type: 'hello' });

  });

  // handle errors
  socket.on('error',function( err ){
    console.error( err );
  });

};

// set an HTTP (req.url) or WS (msg.type) handler
exports.on = function( type, listener ){
  listeners[ type ] = listener;
};

// close the servers
exports.close = function(){
  server.close();
  socket.close();
  handler = null;
};

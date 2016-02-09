var assert = require('assert');
var server = require('../test/server');
var B9 = require('../index');

describe('src/connect',function(){

  var bot = new B9({
    package: false,
    host: server.host,
    port: server.port,
    token: 123,
    interval: 50
  });

  it('has a public api',function(){
    assert.equal( typeof bot.start, 'function' );
    assert.equal( typeof bot.stop, 'function' );
    assert.equal( typeof bot.send, 'function' );
  });

  it('handles an auth error',function( done ){

    // set up the test server response
    server.on('/api/rtm.start',function( params, send ){
      send({ ok: false, error: "not_authed" });
    });

    bot.start(function( err, msg ){
      assert.equal( err instanceof Error, true );
      assert.equal( err.message, 'not_authed' );
      assert.equal( msg.ok, false );
      assert.equal( msg.error, 'not_authed' );
      done();
    });

  });

  it('handles socket url errors',function( done ){

    // set up the test server response, bad socket url
    server.on('/api/rtm.start',function( params, send ){
      send({ ok: true, self: {}, url: '' });
    });

    bot.start(function( err, msg ){
      assert.equal( err instanceof Error, true );
      assert.equal( err.message, 'invalid url' );
      done();
    });
  });

  it('handles socket connection errors',function( done ){

    // set up the test server response, bad socket host
    server.on('/api/rtm.start',function( params, send ){
      send({ ok: true, self: {}, url: 'ws://nohost/' });
    });

    bot.start(function( err, msg ){
      assert.equal( err instanceof Error, true );
      assert.equal( err.message.indexOf('getaddrinfo ENOTFOUND'), 0 );
      done();
    });
  });

  it('connects to the socket',function( done ){

    // set up the test server response
    server.on('/api/rtm.start', null );

    bot.start(function( err, msg ){
      assert.equal( err, null );
      assert.equal( msg.type, 'hello' );
      bot.stop();
      done();
    });

  });

  it('emits `rtm.send` events',function( done ){
    // set up the test server response
    server.on('/api/rtm.start', null );
    // listen to send events...
    bot.on('rtm.send',function( msg ){
      assert.equal( msg.type, 'goodbye' );
      assert.equal( !!msg.id, true );
      bot.off('rtm.send');
      bot.stop();
      done();
    });
    // do it
    bot.start(function(){
      bot.send({ type:'goodbye' });
    });
  });

  it('emits `rtm.read` events',function( done ){
    // set up the test server response
    server.on('/api/rtm.start', null );
    // listen to read events...
    bot.on('rtm.read',function( msg ){
      assert.equal( msg.type, 'hello' );
    });
    // do it
    bot.start(function(){
      bot.off('rtm.read');
      bot.stop();
      done();
    });
  });

  it('emits message type events',function( done ){
    // set up the test server response
    server.on('/api/rtm.start', null );
    // set up a server message response
    server.on('foo',function( msg, send ){
      send({ type:'message', text:'hello whorl' });
    });
    // listen to read events...
    bot.on('message',function( msg ){
      assert.equal( msg.type, 'message' );
      assert.equal( msg.text, 'hello whorl' );
      bot.stop();
      done();
    });
    // do it
    bot.start(function(){
      bot.send({ type:'foo' });
    });
  });

  it('provides a reply function',function( done ){
    // set up the test server response
    server.on('/api/rtm.start', null );
    // set up a server message response
    server.on('reply_test',function( msg, send ){
      send({ type:'reply_test', channel:'#test', text:'how are you?' });
    });
    // listen to read events...
    bot.on('reply_test',function( msg, reply ){
      assert.equal( msg.type, 'reply_test' );
      assert.equal( msg.channel, '#test' );
      assert.equal( msg.text, 'how are you?' );
      reply('fine, thanks');
    });
    // replies are sent as messages
    server.on('message',function( msg, send ){
      bot.stop();
      done();
    });
    // do it
    bot.start(function(){
      bot.send({ type:'reply_test' });
    });
  });

  it('pings the server on an interval',function( done ){
    // set up the test server response
    server.on('/api/rtm.start', null );
    // read all server responses
    bot.on('rtm.read',function( msg ){
      if ( msg.type === 'pong' ){
        var elapsed = msg.time - time,
        diff = elapsed - bot._interval;
        // assert a very small margin of error
        assert.equal( diff < 25, true );
        bot.stop();
        done();
      }
    });
    var time = Date.now();
    // do it
    bot.start();
  });

});

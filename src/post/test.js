var assert = require('assert');
var server = require('../test/server.js');
var B9 = require('../index');

describe('src/post',function(){

  var bot = new B9({
    package: false,
    host: server.host,
    port: server.port,
    token: 123
  });

  it('has a public api',function(){
    assert.equal( typeof bot.post, 'function' );
  });

  it('handles api errors',function( done ){

    // set up the test server response
    server.on('/api/foo', function( params, send ){
      send({ ok: false, error: "not_authed" });
    });

    // send a request
    bot.post('foo', function( err, msg ){
      assert.equal( err, null );
      assert.equal( msg.ok, false );
      assert.equal( msg.error, 'not_authed' );
      done(); // exit `it` block
    });

  });

  it('handles http errors',function( done ){

    // set up the test server response
    server.on('/api/foo', function( params, send ){
      send( null, 404 );
    });

    // send a request
    bot.post('foo', function( err, msg ){

      assert.equal( err instanceof Error, true );
      assert.equal( err.message, 'Not Found' );
      done(); // exit `it` block
    });

  });

  it('throws without api token',function( done ){

    // catch exceptions
    assert.throws(function(){
      B9.prototype._package = false;
      // quick start without token
      var bot = B9();
      // send a request
      bot.post('foo');
    }, function( err ){
      assert.equal( err instanceof Error, true );
      assert.equal( (/token/i).test( err ), true );
      done(); // exit `it` block
      return true;
    });

  });

  it('handles host errors',function( done ){
    // incomplete test server set up
    var bot = new B9({
      package: false,
      host:server.host,
      token: 123
    });
    // send a request
    bot.post('foo', function( err, msg ){
      assert.equal( err instanceof Error, true );
      assert.equal( msg.ok, false );
      assert.equal( msg.error, 'ECONNREFUSED' );
      done();
    });
  });

  it('emits for successful calls',function( done ){

    // set up the test server response
    server.on('/api/foo', function( params, send ){
      send({ ok: true, prop: 123 });
    });

    // set a listener
    bot.on('foo',function( msg ){
      assert.equal( msg.ok, true );
      assert.equal( msg.prop, 123 );
      done();
    });

    // call it
    bot.post('foo');

  });

});


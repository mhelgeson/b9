var assert = require('assert');
var B9 = require('../index');

describe('src/events',function(){

  var bot = new B9({ package:false });

  it('has a public api',function(){
    assert.equal( typeof bot.emit, 'function' );
    bot.emit('foo'); // no-op
    assert.equal( typeof bot.off, 'function' );
    bot.off('foo'); // no-op
    assert.equal( typeof bot.on, 'function' );
    bot.on('foo'); // no-op
  });

  it('adds listeners',function(){
    var count = 0;
    var callback = function(){
      count += 1;
    };
    bot.on('test', callback );
    bot.emit('test');
    assert.equal( count, 1 );
    bot.off('test', callback );
    bot.emit('test');
    assert.equal( count, 1 );
  });

  it('removes listeners',function(){
    // TODO: off
  });

  it('calls listeners',function(){
    // TODO: emit
  });

});

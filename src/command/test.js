var assert = require('assert');
var B9 = require('../index');

describe('src/command',function(){

  var bot = new B9({ package:false });

  it('has a public api',function(){
    assert.equal( typeof bot.command, 'function' );
  });

  it('registers a basic command',function(){
    // counter
    var foo = 0;
    // register a foo command
    bot.command('foo',
      'the foo command',
      function(){
        foo += 1;
      }
    );
    // simulate a foo command
    simulate('foo');
    // callback was fired
    assert.equal( foo, 1 );
  });

  it('registers a command with optional arguments',function(){
    // counter
    var bar = 0, arg;
    // register another command
    bot.command('bar [arg]',
      'the bar command',
      function( msg ){
        bar += 1;
        arg = msg.argv.arg;
      }
    );
    // simulate command
    simulate('bar');
    // callback was fired
    assert.equal( bar, 1 );
    // optional arg is null
    assert.equal( arg, null );
    // simulate command
    simulate('bar abc');
    // callback was fired
    assert.equal( bar, 2 );
    // optional arg is defined
    assert.equal( arg, 'abc' );
  });

  it('registers a command with required arguments',function(){
    // counter
    var baz = 0, arg;
    // register another command
    bot.command('baz <arg>',
      'the baz command',
      function( msg ){
        baz += 1;
        arg = msg.argv.arg;
      }
    );
    // simulate command
    simulate('baz');
    // callback was NOT fired
    assert.equal( baz, 0 );
    // optional arg is null
    assert.equal( arg, null );
    // simulate command
    simulate('baz xyz');
    // callback was fired
    assert.equal( baz, 1 );
    // optional arg is defined
    assert.equal( arg, 'xyz' );
  });

  it('has an informative `help` command',function(){
    // local ref
    var lines = [];
    // reply function which parses the help response
    function parse_help ( txt ){
      // remove formatting, divide lines into array
      lines = txt.replace(/\*/g,'').split(/\n+/);
    };
    // simulate command
    simulate('help', parse_help );
    // inspect the parsed result
    assert.equal( (/^help/).test(lines[1]), true );
    assert.equal( (/^foo/).test(lines[2]), true );
    assert.equal( (/^bar/).test(lines[3]), true );
    assert.equal( (/^baz/).test(lines[4]), true );
  });

  it('answers to direct mentions',function(){

    simulate('help help',function( txt ){
      assert.equal( txt.length > 0, true );
    });

    simulate('help error',function( err ){
      assert.equal( err.split(':').shift(), 'Command not found');
    });

  });

  it('does not crash on text-less messages',function(){

    assert.doesNotThrow(function(){
      bot.emit('message', { channel:'D' });
    });

  });

  // simulate receiving a command
  function simulate ( str, reply ){
    bot.emit('message',{
      text: '<@'+ bot.self.id +'>: '+ ( str || '' ),
      channel: 'D' // direct msg
    }, reply );
  }

});


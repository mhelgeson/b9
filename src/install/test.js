var assert = require('assert');
var path = require('path');
var B9 = require('../index');

describe('src/install',function(){

  it('has a public api',function(){
    var bot = new B9();
    bot.install(); // no-op
    assert.equal( typeof bot.install, 'function' );
  });

  it('throws error when package.json not found',function(){
    assert.throws(function(){
      new B9({ package: 'package.json' });
    }, Error );
  });

  it('can be disabled with `package:false`',function(){
    // doesn't throw error
    var bot = new B9({ package: false });
    assert.equal( bot._package, false );
  });

  it('can install plugin dependencies',function(){
    // doesn't throw error
    var bot = new B9({
      // build an absolute path for the package.json module
      package: path.join( __dirname, './test/package.json' )
    });
    // this property is set in the module that should be installed
    assert.equal( !!bot.test_plugin, true );
  });

  it('can install local paths',function(){
    var bot = new B9();
    bot.install('./test/b9-plugin');
    assert.equal( !!bot.test_plugin, true );
  });

  it('can install functions',function(){
    var bot = new B9();
    bot.install( require('./test/b9-plugin') );
    assert.equal( !!bot.test_plugin, true );
  });

});

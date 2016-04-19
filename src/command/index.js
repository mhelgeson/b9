var tokenize = require('./tokenize');

/** @public module */
module.exports = function( b9 ){

  /**
   * map of registered commands
   * @private cache
   */
  var commands = Object.create( null );

  /**
   * declare a new command and action
   * @public method
   */
  b9.command = function( syntax, desc, callback ){
    var args = syntax.split(/ +/),
    name = args.shift();
    commands[ name ] = {
      name: name,
      syntax: syntax,
      desc: desc,
      args: args.map(function( arg ){
        return {
          key: arg.slice( 1, -1 ),
          required: arg[0] === '<' ? true : false
        }
      }),
      action: callback
    };
    return b9;
  };

  /**
   * listen to messages, look for commands
   * @private listener
   */
  b9.on('message', function( msg, reply ){
    if ( !msg.text ){
      return;
    }
    // {array} argument vector
    var argv = tokenize(msg.text), cmd, i = 1, direct;
    // indicates a specific [start of message] mention
    if ( msg.text.indexOf('<@'+ b9.self.id +'>') === 0 ){
      argv = argv.slice(1); // shift arguments
      direct = true;
    }
    // indicates a direct instant message
    if ( msg.channel && msg.channel[0] === 'D' ){
      direct = true;
    }
    if ( direct && commands[ cmd = argv[0] ] != null ){
      var ok = commands[ cmd ].args.every(function( arg ){
        var next = argv[ i++ ];
        if ( !next && arg.required ){
          return false; // fail
        }
        argv[ arg.key ] = next;
        return true; // pass
      });
      if ( ok ){ // required args were passed...
        msg.argv = argv;
        commands[ cmd ].action.call( b9, msg, reply );
        return false; // stop propagation
      }
    }
  });

  /**
   * add basic `help` command listener
   * @public command
   */
  b9.command('help [cmd]',
    'List available commands, or syntax of a single command',
    function( msg, reply ){
      var lines = [];
      if ( msg.argv.cmd != null ){
        var cmd = commands[ msg.argv.cmd ];
        if ( !cmd ){
          lines.push('Command not found: `'+ msg.argv.cmd +'`');
        }
        else {
          lines.push('*'+ cmd.name +'* - '+( cmd.desc || "" ) );
          lines.push('`'+ cmd.syntax +'`');
        }
      }
      else {
        lines.push('Available commands...');
        Object.keys( commands ).forEach(function( name ){
          var cmd = commands[ name ];
          lines.push('*'+ name +'* - '+( cmd.desc || "" ) );
        });
      }
      reply( lines.join('\n\n') );
    }
  );

  /**
   * add basic `ping` command listener
   * @public command
   */
  b9.command('ping',
    'Test reachability of the bot.',
    function( msg, reply ){
      reply('PONG');
    }
  );

  /**
   * add basic `time` command listener
   * @public command
   */
  b9.command('time',
    'Get the current time of the bot.',
    function( msg, reply ){
      reply( new Date().toString() );
    }
  );

};

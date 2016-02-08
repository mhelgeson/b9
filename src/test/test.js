var server = require('./server.js');

before( server.listen );
after( server.close );

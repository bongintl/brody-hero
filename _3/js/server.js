var express = require('express');

var server = express();

server.use( express.static( 'www' ) );

server.listen( process.env.PORT, process.env.IP, () => console.log('👍🏻') );
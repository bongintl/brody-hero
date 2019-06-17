var fs = require('fs');
var express = require('express');

var server = express();

var files = fs.readdirSync( __dirname )
    .filter( file => fs.statSync( file ).isDirectory() && file[ 0 ] === '_' );

server.get('/', ( req, res ) => {
    
    var html = `
        <h1>:(</h1>
        <ul>
            ${ files.map( file => `<li><a href="/${file}">${file}</a></li>` ) }
        </ul>
    `;
    
    res.send( html );
    
})

files.forEach( file => {
        
    server.use( '/' + file, express.static( file + '/www' ) );
    
})

server.use('/img', express.static('img') );

server.listen( process.env.PORT, process.env.IP, () => console.log('👍🏻') );
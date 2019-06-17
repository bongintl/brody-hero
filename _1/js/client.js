var m = require('mithril');
var { fit, center, map } = require('../../lib/utils');
var view = require('../../lib/view');
var images = require('../../lib/channel4.js');

var config = {
    scale: 1,
    depth: .05,
    focus: 0
}

view( gui => {
    
    gui.add(config, 'scale', 1, 1.5).step(.01);
    gui.add(config, 'depth', 0, .5).step(.01);
    gui.add( config, 'focus', 0, images.length - 1 ).step( 1 );
    
    images.forEach( ( image, i ) => {
        
        var f = gui.addFolder('Layer ' + ( i + 1 ) );
        f.add( image, 'scale', .5, 1.5 ).step(.01);
        f.add( image, 'contain' );
        
    })
    
    return ( win, offset ) => images.map( ( image, i ) => {
        
        var size = fit( image.size, win, image.contain );
        var position = center( size, win );
        
        var scale = map(
            Math.abs( i - config.focus ),
            0, images.length - 1,
            config.scale, config.scale + config.depth
        );
        
        var parallax = [
            size[ 0 ] * ( scale - 1 ) * offset[ 0 ] * .5,
            size[ 1 ] * ( scale - 1 ) * offset[ 1 ] * .5
        ];
        
        var transform = `scale( ${ image.scale }, ${ image.scale } ) translate( ${ parallax[ 0 ] }px, ${ parallax[ 1 ] }px ) scale( ${ scale }, ${ scale } )`;
        
        var style = {
            backgroundImage: `url(${ image.url })`,
            left: position[ 0 ] + 'px',
            top: position[ 1 ] + 'px',
            width: size[ 0 ] + 'px',
            height: size[ 1 ] + 'px',
            transform
        }
        
        return m('.layer', { style } );
        
    })
    
})
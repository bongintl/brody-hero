var m = require('mithril');
var { fit, center, map } = require('../../lib/utils');
var view = require('../../lib/view');
var images = require('../../lib/channel4.js');

var config = {
    tilt: Math.PI / 4,
    focus: 0,
    depth: 100
}

view( gui => {
    
    gui.add(config, 'tilt', 0, Math.PI / 2 ).step(.01);
    gui.add( config, 'focus', 0, images.length - 1 ).step( 1 );
    
    images.forEach( ( image, i ) => {
        
        var f = gui.addFolder('Layer ' + ( i + 1 ) );
        f.add( image, 'scale', .5, 1.5 ).step(.01);
        f.add( image, 'contain' );
        
    })
    
    return ( win, offset ) => {
        
        console.log(offset[ 0 ]);
        
        var style = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            perspective: '1000px',
            transform: `rotate3d( 0, 1, 0, ${ offset[0] * config.tilt }rad )`
        };
        
        return m('div', { style }, images.map( ( image, i ) => {
        
            var size = fit( image.size, win, image.contain );
            var position = center( size, win );
            
            var z = Math.abs( i - config.focus ) * config.depth;
            
            var style = {
                backgroundImage: `url(${ image.url })`,
                left: position[ 0 ] + 'px',
                top: position[ 1 ] + 'px',
                width: size[ 0 ] + 'px',
                height: size[ 1 ] + 'px',
                transform: `translateZ(${z}px)`
            }
            
            return m('.layer', { style } );
            
        }))
        
    }
    
})
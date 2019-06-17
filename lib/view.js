var m = require('mithril');
var mouse = require('./mouse')();

/* global dat */
var gui = new dat.GUI();
var f = gui.addFolder('Mouse');
f.add( mouse, 'lag', 0, .99 ).step(.00001).name('Lag');
f.add( mouse, 'invert' ).name('Invert');

module.exports = fn => {
    
    var createLayers = fn( gui );
    
    var View = {
        
        view: () => {
            
            var win = [ window.innerWidth, window.innerHeight ];
        
            var offset = [
                mouse.position[ 0 ] / win[ 0 ],
                mouse.position[ 1 ] / win[ 1 ]
            ];
            
            return m('.main', { onmousemove: mouse.set }, createLayers( win, offset ) );
            
        }
        
    }
    
    mouse.onChange = m.redraw;

    m.mount( document.querySelector('.root'), View );
    
}
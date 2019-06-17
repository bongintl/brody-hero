var lerp = ( a, b, t ) => a + ( b - a ) * t;

module.exports = () => {
    
    var mouse = {
        position: [ 0, 0 ],
        target: [ 0, 0 ],
        onChange: () => {},
        lag: .9,
        invert: false,
        set: e => {
            e.redraw = false;
            var x = e.clientX;
            var y = e.clientY;
            
            if ( mouse.invert ) {
                
                x = window.innerWidth - x;
                y = window.innerHeight - y;
                
            }
            
            mouse.target[ 0 ] = x;
            mouse.target[ 1 ] = y;
        }
    }
    
    var tick = () => {
        
        mouse.position[ 0 ] = lerp( mouse.position[ 0 ], mouse.target[ 0 ], 1 - mouse.lag );
        mouse.position[ 1 ] = lerp( mouse.position[ 1 ], mouse.target[ 1 ], 1 - mouse.lag );
        
        mouse.onChange( mouse.position );
        
        requestAnimationFrame( tick );
        
    }
    
    tick();
    
    return mouse;
    
}
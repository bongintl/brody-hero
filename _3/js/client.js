var mouse = require('../../lib/mouse')();
var regl = require('regl')();
var frag = require('./frag.glsl');

var draw = regl({
    
    vert: `
        precision mediump float;
        attribute vec2 position;
        void main () {
            gl_Position = vec4(position, 0, 1);
        }
    `,
    
    frag,
    
    attributes: {
        position: [
            [ -1,  3 ],
            [ -1, -1 ],
            [  3, -1 ]
        ]
    },
    
    uniforms: {
        
        resolution: ({ drawingBufferWidth, drawingBufferHeight }) => {
    
            return [ drawingBufferWidth, drawingBufferHeight ];
            
        }
        
    },
    
    depth: {
        
        enable: false
        
    },
    
    blend: {
        
        enable: true,
      
        func: {
        
            src: 'src alpha',
        
            dst: 'one minus src alpha'
        }
        
    },
    
    count: 3
    
})

var loadImage = src => new Promise( resolve => {
    
    /* global Image */
    
    var img = new Image();
    
    img.onload = () => resolve( img );
    
    img.crossOrigin = '';
    
    img.src = src;
    
});

loadImage('/img/BA.Web.TestStories.Channel4.Image.21.jpg')
    .then(( img ) => {
        
        
        
    })
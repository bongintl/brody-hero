var fit = ( [ srcW, srcH ], [ destW, destH ], contain ) => {
    var fn = contain ? Math.min : Math.max;
    var scale = fn( destW / srcW, destH / srcH );
    return [ srcW * scale, srcH * scale ];
}

var center = ( [ srcW, srcH ], [ destW, destH ] ) => {
    
    return [
        ( destW - srcW ) / 2,
        ( destH - srcH ) / 2
    ];
    
}

var map = ( x, oldMin, oldMax, newMin, newMax ) => {
    return newMin + ( newMax - newMin ) * ( x - oldMin ) / ( oldMax - oldMin );
}

module.exports = { fit, center, map };
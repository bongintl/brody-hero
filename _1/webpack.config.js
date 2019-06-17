var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var ReloadServerPlugin = require('reload-server-webpack-plugin');
var path = require('path');
var isPlainObject = require('lodash/isPlainObject');

module.exports = ( env = {} ) => {
    
    return {
        
        target: 'web',
        
        entry: ifEnv({
            
            'production': [ 'babel-polyfill' ],
            
            '*': [
                
                path.resolve( __dirname, 'scss', 'style.scss' ),
                
                path.resolve( __dirname, 'js', 'client.js' )
                
            ]
            
        }),
        
        devtool: ifEnv({
            
            'dev': 'cheap-module-source-map',
            
            'production': 'source-map'
            
        }),
        
        output: {
            
            path: path.resolve( __dirname, 'www' ),
            
            filename: 'bundle.js',
            
            sourceMapFilename: '[file].map'
            
        },
        
        module: {
            
            loaders: [
                
                {
                    
                    test: /\.glsl$/,
                    
                    loaders: [
                        
                        'raw-loader',
                        
                        'glslify-loader'
                        
                    ]
                    
                },
                
                {
                
                    test: /\.scss$/,
                    
                    loader: ExtractTextPlugin.extract({
                        
                        use: [
                            
                            'css-loader',
                            
                            'sass-loader',
                            
                            'autoprefixer-loader'
                            
                        ]
                        
                    })
                    
                },
                
                {
                    
                    test: /\.js$/,
                    
                    exclude: /node_modules/,
                    
                    loaders: [
                        
                        {
                            
                            loader: 'babel-loader',
                            
                            options: {
                                
                                presets: ifEnv({
                                    
                                    'production': [
                                    
                                        [ 'env' , { targets: { browsers: 'ie >= 11' } } ]
                                
                                    ]
                                    
                                }),
                                
                                plugins: ifEnv({
                                    
                                    'production': [ 'transform-runtime' ]
                                    
                                })
                                
                            }
                            
                        }
                        
                    ]
                    
                }
                
            ]
            
        },
        
        plugins: ifEnv({
            
            '*': [
                
                new ExtractTextPlugin( 'style.css' )
            
            ],
            
            'production': [
            
                new UglifyJSPlugin({
                    
                    sourceMap: true,
                    
                    parallel: true
                    
                })
            
            ]
            
        })
        
    }
    
    function ifEnv ( config ) {
        
        var keys = Object.keys( config );
        var values = keys.map( key => config[ key ] );
        
        var included = keys
            .filter( key => key === '*' || key in env )
            .map( key => config[ key ] );
            
        if ( values.every( Array.isArray ) ) {
            
            // Combine array options
            
            return included.reduce( ( a, b ) => a.concat( b ), [] );
            
        } else if ( values.every( isPlainObject ) ) {
            
            // Combine object options
            
            return included.reduce( ( a, b ) => Object.assign( a, b ), {} );
            
        } else if ( included.length === 1 && !( '*' in config ) ) {
            
            // Single value per environment
            
            return included[ 0 ];
            
        } else {
            
            // One value for enviromnent, one for *
            
            return included;
            
        }
        
    }

}

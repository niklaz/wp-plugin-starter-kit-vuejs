var webpack = require('webpack')

module.exports = {
    entry: {
        main: './src/js/main.js',
        admin: './src/js/admin.js'
    },
    output: {
        path: "/assets/js/",
        publicPath: "/assets/js/",
        filename: '[name].js',
    },
    watch: true,
    module: {
        loaders: [
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/src|vue-router\//,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test: /\.vue$/,
                loader: 'vue'
            }
        ]
    },
    babel: {
        presets: ['es2015'], //,'@babel/preset-env'
        plugins: ['transform-runtime']
    },
    resolve: {
        modulesDirectories: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    }
}
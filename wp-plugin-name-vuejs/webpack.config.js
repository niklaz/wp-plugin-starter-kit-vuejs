const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
    optimization: {
        minimize: true,
        minimizer: [new UglifyJsPlugin({
            include: /\.min\.js$/
        })]
    },
    mode: 'development',
    devtool: 'source-map',
    entry: {
        "main": './src/js/main.js',
        "admin": './src/js/admin.js',
        "main.min": './src/js/main.js',
        "admin.min": './src/js/admin.js'
    },
    output: {
        path: "/assets/js/",
        publicPath: "/assets/js/",
        filename: '[name].js',
    },
    watch: true,
    module: {
        rules: [
            {
                test: /\.js$/,
                // excluding some local linked packages.
                // for normal use cases only node_modules is needed.
                exclude: /node_modules|vue\/src|vue-router\//,
                use: {
                    loader: 'babel-loader',
                    options: {
                      /*  presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-object-rest-spread']*/
                        // presets: ['es2015'], //,' @babel/preset-env'
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }

            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style",
                    },
                    {
                        loader: "css",
                    },
                    {
                        loader: "sass",
                    }
                ],
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue',
                    }
                ]

            }
        ]
    },
    resolve: {
        modules: ['node_modules'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },

}
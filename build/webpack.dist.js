'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('src/index.js'),

    output: {
        filename: options.isProduction ? 'dbcomponent.min.js' : 'dbcomponent.js',
        path: options.paths.output.main,
        library: 'KeenUI',
        libraryTarget: 'umd'
    },

    plugins: [
        new webpack.BannerPlugin({
            banner: options.banner,
            raw: true,
            entryOnly: true
        }),

        new ExtractTextPlugin({
            filename: options.isProduction ? 'dbcomponent.min.css' : 'dbcomponent.css'
        })
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  test: /\.css/,
  use: ExtractTextPlugin.extract([
    { loader: 'vue-style-loader', options: { sourceMap: true } },
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } }
  ])
};

if (options.isProduction) {
    config.plugins = config.plugins.concat([
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),

        // Set the production environment
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        // Minify with dead-code elimination
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]);
}

module.exports = config;
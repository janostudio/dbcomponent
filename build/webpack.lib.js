'use strict';

const merge = require('deep-assign');
const webpack = require('webpack');

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: {
        UiAlert: ['./src/UiAlert.vue']
    },
    output: {
        path: options.paths.output.lib,
        filename: options.isProduction ? '[name].min.js' : '[name].js',
        library: ['KeenUI', '[name]'],
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.BannerPlugin({
            banner: options.banner,
            raw: true,
            entryOnly: true
        })
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  test: /\.css/,
  use: [
    { loader: 'vue-style-loader', options: { sourceMap: false } },
    { loader: 'css-loader', options: { sourceMap: false } },
    { loader: 'postcss-loader', options: { sourceMap: false } }
  ]
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
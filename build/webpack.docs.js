'use strict';

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('deep-assign');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const options = require('./options');
const base = require('./webpack.base.js');

const config = merge(base, {
    entry: options.paths.resolve('example/index.js'),

    output: {
        filename: 'docs.bundle.js',
        path: options.paths.output.docs
    },

    plugins: [
        new ExtractTextPlugin({
            filename: 'docs.bundle.css'
        }),

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
        new UglifyJSPlugin()
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  test: /\.css/,
  loader: ExtractTextPlugin.extract('style','vue-style!css!postcss?sourceMap')
};
// config.module.rules[0].options.loaders = {
//   test: /\.css/,
//   use: [
//     { loader: 'vue-style-loader', options: { sourceMap: true } },
//     { loader: 'css-loader', options: { sourceMap: true } },
//     { loader: 'postcss-loader', options: { sourceMap: true } }
//   ]
// };

module.exports = config;
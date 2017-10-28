'use strict';

const merge = require('deep-assign');
const options = require('./options');
const base = require('./webpack.base.js');
const webpack = require('webpack');

const config = merge(base, {
    watch: true,
    devtool: '#eval-source-map',
    entry: options.paths.resolve('example/index.js'),
    output: {
        filename: 'docs.bundle.js',
        path: options.paths.output.docs
    },
    devServer: {
        contentBase: options.paths.output.docs,
        port: 9000,
        historyApiFallback: true,
        noInfo: true,
        clientLogLevel: 'error'
    },
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: function () {
            return [precss, autoprefixer];
          }
        }
      })
    ]
});

// First item in module.rules array is Vue
config.module.rules[0].options.loaders = {
  test: /\.css/,
  use: [
    { loader: 'vue-style-loader', options: { sourceMap: true } },
    { loader: 'css-loader', options: { sourceMap: true } },
    { loader: 'postcss-loader', options: { sourceMap: true } }
  ]
};

module.exports = config;
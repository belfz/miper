var path = require('path');
var webpack = require('webpack');
var PROD = JSON.parse(process.env.PROD_DEV || "0");

module.exports = {
  entry: './src/main.js',
  devtool: !PROD ? 'source-map' : undefined,
  output: {
    path: './dist',
    filename: 'bundle.min.js',
    sourceMapFilename: '[name].js.map'
  },
  devServer: {
    inline: true,
    contentBase: './dist'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/, // include .js files
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        loader: "jshint-loader"
      }
    ],
    loaders: [
      {
        test: /.+.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },

  jshint: {
    esversion: 6
  }
};

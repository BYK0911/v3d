const path = require('path');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'production',
  
  entry: {
    demo: path.resolve(__dirname, '../demo/index.js')
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../demo/index.html')
    })
  ]
})
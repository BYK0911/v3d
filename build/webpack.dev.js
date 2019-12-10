const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'development',

  devtool: 'cheap-source-map',
  
  entry: {
    demo: path.resolve(__dirname, '../demo/index.js')
  },

  devServer: {
    contentBase: path.join(__dirname, '/dist'),
    compress: true,
    host: '0.0.0.0',
    port: 8000,
    open: true
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../demo/index.html')
    })
  ]
})
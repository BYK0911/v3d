const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const base = require('./webpack.base');

module.exports = merge(base, {
  mode: 'production',
  
  entry: {
    storeMap: path.resolve(__dirname, '../src/index.js')
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
})
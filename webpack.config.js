const commons = require('./webpack/commons')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    commons.entry.main
  ],

  output: commons.output,

  devServer: {
    hot: true,
    contentBase: commons.paths.dist
  },

  module: {
    rules: [
      commons.standardPreLoader,
      commons.jsLoader,
      commons.styleLoader
    ]
  },

  plugins: commons.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin(commons.htmlPlugin),
    new HtmlWebpackHarddiskPlugin()
  ]),

  resolve: commons.resolve
}

'use strict'

const { join } = require('path')
const webpack = require('webpack')
const HtmlPlugin = require('html-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const common = require('./common')

module.exports = {
  devtool: 'source-map',

  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    'webpack/hot/only-dev-server',
    common.entry.main
  ],

  output: Object.assign({}, common.output, {
    filename: '[name]-[hash].js'
  }),

  plugins: common.plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
    new HtmlPlugin(Object.assign({}, common.htmlPluginConfig, {
      template: join(common.paths.src, 'client', 'html', 'template.html')
    }))
  ]),

  module: {
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.sassLoader,
      common.fileLoader,
      common.urlLoader
    ]
  },

  resolve: common.resolve
}

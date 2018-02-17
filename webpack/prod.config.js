'use strict'

const { join } = require('path')
const webpack = require('webpack')
const common = require('./common')

const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanPlugin = require('clean-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

module.exports = {
  devtool: 'cheap-module-source-map',

  entry: common.entry,

  output: Object.assign({}, common.output, {
    path: join(common.paths.dist, 'client')
  }),

  plugins: [
    new CleanPlugin(['dist'], {
      root: common.paths.root
    }),

    new ExtractTextPlugin({
      filename: 'style.css'
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'react-build',
      chunks: ['main'],
      minChunks: ({ resource }) => (
        /node_modules\/(react(-dom)?|fbjs)\//.test(resource) ||
        /node_modules\/preact(-compat)?\//.test(resource)
      )
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['main'],
      minChunks: ({ resource }) => /node_modules/.test(resource)
    }),

    new HtmlPlugin(Object.assign({}, common.htmlPluginConfig, {
      template: join(common.paths.src, 'client', 'html', 'template-prod.html'),
      inject: false,
      minify: { collapseWhitespace: true },
      chunksSortMode: common.htmlChunksSort(['react-build', 'vendor', 'main'])
    })),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    })
  ].concat(
    process.env.ANALYZER ? new BundleAnalyzerPlugin() : []
  ),

  module: {
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.fileLoader,
      common.urlLoader,
      Object.assign({}, common.sassLoader, {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: common.sassLoader.use[0],
          use: [
            common.sassLoader.use[1]
          ].concat(common.sassLoader.use.slice(2))
        })
      })
    ]
  },

  resolve: common.resolve
}

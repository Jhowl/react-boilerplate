'use strict'

import { join } from 'path'
import webpack from 'webpack'
import webpackDev from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'

const config = require('../../webpack/dev.config')
const compiler = webpack(config)
const filename = join(compiler.outputPath, 'generated.html')

export default (app) => {
  const hot = webpackHot(compiler)
  const dev = webpackDev(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true,
    stats: { colors: true },
    compress: true,
    serverSideRender: true
  })

  app.use(dev)
  app.use(hot)

  return () => new Promise((resolve, reject) => {
    compiler.outputFileSystem.readFile(filename, (error, result) => {
      if (error) {
        return reject(error)
      }

      resolve(result.toString())
    })
  })
}

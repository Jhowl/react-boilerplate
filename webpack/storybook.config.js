'use strict'

const { join } = require('path')
const common = require('./common')
const prismPath = join(__dirname, '..', 'node_modules', 'prismjs')

module.exports = {
  module: {
    rules: [
      common.standardPreLoader,
      common.jsLoader,
      common.urlLoader,
      common.fileLoader,
      Object.assign({}, common.sassLoader, {
        test: /\.(css|scss)$/,
        include: common.sassLoader.include.concat([
          join(common.paths.root, 'storybook', 'ui'),
          prismPath
        ])
      })
    ]
  },

  resolve: common.resolve
}

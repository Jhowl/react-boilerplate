'use strict'

const { readFileSync } = require('fs')
const { resolve, join } = require('path')
const { isDev } = require('./config')

module.exports = {
  getSrc: function () {
    return JSON.parse(readFileSync(resolve('.babelrc'), 'utf8'))
  },

  getModuleResolver: function () {
    const { resolve } = require(`../../../webpack/${isDev ? 'common' : 'prod.config'}.js`)

    return ['module-resolver', {
      alias: Object.assign({}, resolve.alias, {
        server: join(__dirname, '..')
      })
    }]
  },

  getConfigServer: function () {
    const src = this.getSrc()

    return Object.assign({}, src, {
      plugins: src.plugins.concat([
        'dynamic-import-node',
        ['transform-require-ignore', { 'extensions': ['.css', '.scss'] }],
        this.getModuleResolver()
      ]),
      sourceMaps: 'both'
    })
  }
}

'use strict'

const { join } = require('path')
const webpack = require('webpack')
const { readFileSync } = require('fs')
const babelrc = JSON.parse(readFileSync(join(__dirname, '..', '.babelrc'), 'utf8'))

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
  client: join(__dirname, '..', 'src', 'client')
}

const alias = {
  src: paths.src,
  scss: join(paths.src, 'scss'),
  data: join(paths.src, 'data'),
  assets: join(paths.src, 'assets'),
  layout: join(paths.src, 'layout'),
  components: join(paths.src, 'components'),
  'redux-flow': join(paths.src, 'redux-flow'),
  reducers: join(paths.src, 'redux-flow', 'reducers')
}

module.exports = {
  paths,

  entry: {
    main: join(paths.src, 'client', 'index')
  },

  output: {
    path: paths.dist,
    publicPath: '/',
    filename: '[name]-[chunkhash].js'
  },

  htmlPluginConfig: {
    title: 'React Boilerplate',
    filename: 'generated.html'
    // favicon: join(paths.src, 'client', 'favicon.png')
  },

  htmlChunksSort: (packages) => (left, right) => {
    const leftIndex = packages.indexOf(left.names[0])
    const rightindex = packages.indexOf(right.names[0])

    if (leftIndex < 0 || rightindex < 0) {
      throw new Error('Unknown package')
    }

    return leftIndex > rightindex ? 1 : -1
  },

  standardPreLoader: {
    enforce: 'pre',
    test: /\.js$/,
    include: paths.src,
    use: 'eslint-loader'
  },

  jsLoader: {
    test: /\.js$/,
    include: paths.src,
    use: {
      loader: 'babel-loader',
      options: Object.assign({}, babelrc, {
        presets: babelrc.presets.map((preset) => (
          preset === 'env' ? ['env', { modules: false }] : preset
        ))
      })
    }
  },

  sassLoader: {
    test: /\.scss$/,
    include: [paths.src],
    use: [ 'style-loader', 'css-loader', 'sass-loader', 'import-glob-loader' ]
  },

  fileLoader: {
    test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|txt)(\?.*)?$/,
    include: [paths.src],
    use: {
      loader: 'file-loader',
      options: {
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  urlLoader: {
    test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
    include: paths.src,
    use: {
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'media/[name].[hash:8].[ext]'
      }
    }
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {
    alias: Object.assign({}, alias)
  }
}

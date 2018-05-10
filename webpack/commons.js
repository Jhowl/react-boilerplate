const { join } = require('path')
const Dashboard = require('webpack-dashboard/plugin')
const { readFileSync } = require('fs')
const babelrc = JSON.parse(readFileSync(join(__dirname, '..', '.babelrc'), 'utf8'))

const paths = {
  root: join(__dirname, '..'),
  src: join(__dirname, '..', 'src'),
  dist: join(__dirname, '..', 'dist'),
  styles: join(__dirname, '..', 'src/styles')
}

const aliases = {
  styles: paths.styles,
  utils: join(paths.src, 'utils'),
  assets: join(paths.src, 'assets'),
  components: join(paths.src, 'components')
}

module.exports = {
  paths,

  entry: {
    main: join(paths.src, 'index')
  },

  output: {
    path: paths.dist,
    publicPath: '/',
    filename: 'bundle.js'
  },

  standardPreLoader: {
    enforce: 'pre',
    test: /\.js$/,
    include: paths.src,
    use: 'eslint-loader'
  },

  htmlPlugin: {
    title: 'React Boilerplate',
    template: join(paths.src, 'html', 'template.html'),
    alwaysWriteToDisk: true
  },

  styleLoader: {
    test: /\.(css|scss)$/,
    use: ['style-loader', 'css-loader', 'sass-loader', 'import-glob-loader']
  },

  jsLoader: {
    test: /\.js$/,
    include: [paths.src],
    use: {
      loader: 'babel-loader',
      options: Object.assign({}, babelrc, {
        presets: babelrc.presets.map((preset) => (
          preset === 'env' ? ['env', { modules: false }] : preset
        ))
      })
    }
  },

  plugins: [
    new Dashboard()
  ],

  resolve: {
    alias: Object.assign({}, aliases)
  }
}

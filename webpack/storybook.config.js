const commons = require('./commons')

module.exports = {
  module: {
    rules: [
      commons.standardPreLoader,
      commons.jsLoader,
      commons.styleLoader
    ]
  },

  resolve: commons.resolve
}

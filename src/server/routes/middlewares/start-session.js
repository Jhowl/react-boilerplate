'use strict'

export default () => (req, res, next) => {
  req.initialStore = {}
  req.session = {}
  next()
}

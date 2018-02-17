'use strict'

require('dotenv').config()

const babel = require('./config/babel')

require('babel-register')(babel.getConfigServer())
require('./server')

'use strict'

import { join } from 'path'
import { readFile } from 'fs'

const filename = join(__dirname, '..', 'client', 'generated.html')

export default (app) => () => new Promise((resolve, reject) => {
  readFile(filename, 'utf8', (error, result) => {
    if (error) {
      return reject(error)
    }

    resolve(result)
  })
})

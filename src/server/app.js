'use strict'

import React from 'react'
import express from 'express'
import compression from 'compression'
import { renderToString } from 'react-dom/server'
import { isDev } from './config/config'
import renderLayout from './lib/render-layout'
import staticDir from './lib/static-dir'
import session from './routes/middlewares/start-session'
import App from '../app'

const app = express()
const htmlServer = require(isDev ? './dev' : './prod').default
const generateHtml = htmlServer(app)

app.set('message', isDev ? 'Waiting for webpack...' : 'Ok, it is ready!')
app.use(compression())
app.use(staticDir(isDev))
app.use(session())

app.get('*', async (req, res) => {
  const context = {}
  const htmlApp = renderToString(
    <App />
  )

  if (context.url) {
    console.log('redirect')
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
    return
  }

  if (context.status === 404) {
    res.status(404)
  }

  const html = await generateHtml()
  res.send(renderLayout(html, htmlApp, {}))
})

export default app

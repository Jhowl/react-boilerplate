'use strict'

import React from 'react'
import { hydrate } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Main from './main'

const renderApp = (NextApp) => {
  hydrate(
    <AppContainer>
      <NextApp />
    </AppContainer>,
    document.querySelector('[data-js="app"]')
  )
}

renderApp(Main)

if (module.hot) {
  module.hot.accept('./main', () => {
    const NextApp = require('./main').default
    renderApp(NextApp)
  })
}

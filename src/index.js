import React from 'react'
import { render } from 'react-dom'

import MainContent from './layout/main-content'

const App = () => (
  <MainContent />
)

render(
  <App />,
  document.querySelector('[data-js="app"]')
)

module.hot.accept()

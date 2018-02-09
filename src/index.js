import React from 'react'
import { HashRouter } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './components/App'

let store = createStore(
  reducers,
  applyMiddleware(thunk)
)

render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)

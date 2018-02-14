import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import { Router } from 'react-router'
import createHistory from 'history/createBrowserHistory'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

import App from './components/App'

const history = createHistory()

const middlewares = [
  thunk,
  routerMiddleware(history)
]

let store = createStore(
  reducers,
  applyMiddleware(...middlewares)
)

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)

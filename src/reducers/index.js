import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import events from './events'
import admins from './admins'
import drinkers from './drinkers'
import toasts from './toasts'
import auth from './auth'
import registrations from './registrations'
import ui from './ui'

const reducers = combineReducers({
  routing: routerReducer,
  events,
  admins,
  drinkers,
  toasts,
  auth,
  registrations,
  ui
})

export default reducers

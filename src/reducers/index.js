import { combineReducers } from 'redux'
import events from './events'
import admins from './admins'
import drinkers from './drinkers'
import toasts from './toasts'
import auth from './auth'

const reducers = combineReducers({
  events,
  admins,
  drinkers,
  toasts,
  auth
})

export default reducers

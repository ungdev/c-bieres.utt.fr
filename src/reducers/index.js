import { combineReducers } from 'redux'
import events from './events'
import admins from './admins'
import drinkers from './drinkers'
import toasts from './toasts'

const reducers = combineReducers({
  events,
  admins,
  drinkers,
  toasts
})

export default reducers

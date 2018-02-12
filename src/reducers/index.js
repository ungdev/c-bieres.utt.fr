import { combineReducers } from 'redux'
import events from './events'
import admins from './admins'
import drinkers from './drinkers'

const reducers = combineReducers({
  events,
  admins,
  drinkers
})

export default reducers

import { combineReducers } from 'redux'
import events from './events'
import admins from './admins'

const reducers = combineReducers({
  events,
  admins
})

export default reducers

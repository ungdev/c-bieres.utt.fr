const initialState = {
  alreadyRegistered: false,
  registration: null
}

const registrations = (state = initialState, action) => {
  switch (action.type) {
    case "DRINKER_BEING_REGISTERED_BY_ID":
      return Object.assign({}, state, {})
    case "REGISTER_DRINKER_BY_ID_ERROR":
      return Object.assign({}, state, {})
    case "REGISTER_DRINKER_BY_ID_SUCCESS":
      return Object.assign({}, state, {})
    case "DRINKER_BEING_UNREGISTERED_BY_ID":
      return Object.assign({}, state, {})
    case "UNREGISTER_DRINKER_BY_ID_ERROR":
      return Object.assign({}, state, {})
    case "UNREGISTER_DRINKER_BY_ID_SUCCESS":
      return Object.assign({}, state, {})
    case "DRINKER_BEING_UNREGISTERED":
      return Object.assign({}, state, {})
    case "UNREGISTER_DRINKER_ERROR":
      return Object.assign({}, state, {})
    case "UNREGISTER_DRINKER_SUCCESS":
      return Object.assign({}, state, {
        registration: null
      })
    case "DRINKER_BEING_REGISTERED":
      return Object.assign({}, state, {})
    case "REGISTER_DRINKER_ERROR":
      return Object.assign({}, state, {
        registrationFailed: true
      })
    case "REGISTER_DRINKER_SUCCESS":
      return Object.assign({}, state, {
        registration: action.eventId
      })
    case "ALREADY_REGISTERED":
      return Object.assign({}, state, {})
    default:
      return state
  }
}

export default registrations

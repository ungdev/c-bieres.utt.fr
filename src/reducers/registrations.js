const initialState = {
  alreadyRegistered: false,
  registration: null,
  registrationFailed: false
}

const registrations = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGOUT':
      return Object.assign({}, state, {registration: null})
    case "UNREGISTER_DRINKER_SUCCESS":
      return Object.assign({}, state, {
        registration: null
      })
    case "REGISTER_DRINKER_ERROR":
      return Object.assign({}, state, {
        registrationFailed: true
      })
    case 'REGISTER_DRINKER_SUCCESS':
    case 'DRINKER_ALREADY_REGISTERED':
    case 'LOAD_REGISTRATION':
      return Object.assign({}, state, {
        registration: action.eventId
      })
    default:
      return state
  }
}

export default registrations

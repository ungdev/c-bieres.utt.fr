const initialState = {
  beingRegisteredById: false,
  registerByIdError: false,
  registerByIdSuccess: false,
  beingUnregisteredById: false,
  unregisterByIdError: false,
  unregisterByIdSuccess: false,
  beingUnregistered: false,
  unregisterError: false,
  unregisterSuccess: false,
  beingRegistered: false,
  registerError: false,
  registerSuccess: false,
  alreadyRegistered: false,
  registration: null
}

const registrations = (state = initialState, action) => {
  switch (action.type) {
    case "DRINKER_BEING_REGISTERED_BY_ID":
      return Object.assign({}, state, {
        beingRegisteredById: true
      })
    case "REGISTER_DRINKER_BY_ID_ERROR":
      return Object.assign({}, state, {
        beingRegisteredById: false,
        registerByIdError: true
      })
    case "REGISTER_DRINKER_BY_ID_SUCCESS":
      return Object.assign({}, state, {
        beingRegisteredById: false,
        registerByIdError: false,
        registerByIdSuccess: true
      })
    case "DRINKER_BEING_UNREGISTERED_BY_ID":
      return Object.assign({}, state, {
        beingUnregisteredById: true
      })
    case "UNREGISTER_DRINKER_BY_ID_ERROR":
      return Object.assign({}, state, {
        beingUnregisteredById: false,
        unregisterByIdError: true
      })
    case "UNREGISTER_DRINKER_BY_ID_SUCCESS":
      return Object.assign({}, state, {
        beingUnregisteredById: false,
        unregisterByIdError: false,
        unregisterByIdSuccess: true
      })
    case "DRINKER_BEING_UNREGISTERED":
      return Object.assign({}, state, {
        beingUnregistered: true
      })
    case "UNREGISTER_DRINKER_ERROR":
      return Object.assign({}, state, {
        beingUnregistered: false,
        unregisterError: true
      })
    case "UNREGISTER_DRINKER_SUCCESS":
      return Object.assign({}, state, {
        beingUnregistered: false,
        unregisterError: false,
        unregisterSuccess: true,
        alreadyRegistered: false,
        registration: null
      })
    case "DRINKER_BEING_REGISTERED":
      return Object.assign({}, state, {
        beingRegistered: true
      })
    case "REGISTER_DRINKER_ERROR":
      return Object.assign({}, state, {
        beingRegistered: false,
        registerError: true
      })
    case "REGISTER_DRINKER_SUCCESS":
      return Object.assign({}, state, {
        beingRegistered: false,
        registerError: false,
        registerSuccess: true,
        registration: action.eventId
      })
    case "ALREADY_REGISTERED":
      return Object.assign({}, state, {
        beingRegistered: false,
        registerError: false,
        alreadyRegistered: true
      })
    default:
      return state
  }
}

export default registrations

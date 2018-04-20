import EventService from '../services/EventService'
import registrationHelper from '../helpers/localStorage/registrationHelper'

export const drinkerBeingRegisteredById = () => {
  return {
    type: 'DRINKER_BEING_REGISTERED_BY_ID'
  }
}
export const registerDrinkerByIdError = (drinker, eventId) => {
  return {
    type: 'REGISTER_DRINKER_BY_ID_ERROR',
    drinker,
    eventId
  }
}
export const registerDrinkerByIdSuccess = (drinker, eventId) => {
  return {
    type: 'REGISTER_DRINKER_BY_ID_SUCCESS',
    drinker,
    eventId
  }
}

export const drinkerBeingUnregisteredById = () => {
  return {
    type: 'DRINKER_BEING_UNREGISTERED_BY_ID'
  }
}
export const unregisterDrinkerByIdError = (drinkerId, eventId) => {
  return {
    type: 'UNREGISTER_DRINKER_BY_ID_ERROR',
    drinkerId,
    eventId
  }
}
export const unregisterDrinkerByIdSuccess = (drinkerId, eventId) => {
  return {
    type: 'UNREGISTER_DRINKER_BY_ID_SUCCESS',
    drinkerId,
    eventId
  }
}

export const drinkerBeingRegistered = () => {
  return {
    type: 'DRINKER_BEING_REGISTERED'
  }
}
export const registerDrinkerError = () => {
  return {
    type: 'REGISTER_DRINKER_ERROR'
  }
}
export const registerDrinkerSuccess = (eventId) => {
  return {
    type: 'REGISTER_DRINKER_SUCCESS',
    eventId
  }
}
export const drinkerAlreadyRegistered = (eventId) => {
  return {
    type: 'DRINKER_ALREADY_REGISTERED',
    eventId
  }
}

export const drinkerBeingUnregistered = () => {
  return {
    type: 'DRINKER_BEING_UNREGISTERED'
  }
}
export const unregisterDrinkerError = () => {
  return {
    type: 'UNREGISTER_DRINKER_ERROR'
  }
}
export const unregisterDrinkerSuccess = (drinkerId, eventId) => {
  return {
    type: 'UNREGISTER_DRINKER_SUCCESS',
    drinkerId,
    eventId
  }
}

export const toggleRegistrationForm = () => {
  return {
    type: 'TOGGLE_REGISTRATION_FORM'
  }
}

export const checkRegistration = () => {
  return dispatch => {
    const registration = registrationHelper.get()
    if (registration) {
      dispatch(registerDrinkerSuccess(registration))
    }
  }
}

export const registerById = (drinker, eventId) => {
  return dispatch => {
    dispatch(drinkerBeingRegisteredById())
    return EventService.register({id: drinker._id, eventId})
      .then(response => response.data)
      .then(_ => dispatch(registerDrinkerByIdSuccess(drinker, eventId)))
      .catch(_ => dispatch(registerDrinkerByIdError(drinker, eventId)))
  }
}

export const unregisterById = (data) => {
  return dispatch => {
    dispatch(drinkerBeingUnregisteredById())
    return EventService.unregister(data)
      .then(response => response.data)
      .then(_ => dispatch(unregisterDrinkerByIdSuccess(data.id, data.eventId)))
      .catch(_ => dispatch(unregisterDrinkerByIdError(data.id, data.eventId)))
  }
}

export const register = (nextEventId) => {
  return dispatch => {
    dispatch(drinkerBeingRegistered())
    return EventService.register()
      .then(_ => {
        registrationHelper.set(nextEventId)
        return dispatch(registerDrinkerSuccess(nextEventId))
      })
      .catch(err => {
        if (err.response.status == 409) {
          registrationHelper.set(nextEventId)
          return dispatch(drinkerAlreadyRegistered(nextEventId))
        }
        return dispatch(registerDrinkerError())
      })
  }
}

export const unregister = () => {
  return dispatch => {
    dispatch(drinkerBeingUnregistered())
    return EventService.unregister()
      .then(_ => {
        registrationHelper.clean()
        return dispatch(unregisterDrinkerSuccess())
      })
      .catch(_ => dispatch(unregisterDrinkerError()))
  }
}

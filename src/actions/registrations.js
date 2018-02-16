import EventService from '../services/EventService'
import registrationHelper from '../helpers/localStorage/registrationHelper'

export const drinkerBeingRegisteredById = () => {
  return {
    type: 'DRINKER_BEING_REGISTERED_BY_ID'
  }
}
export const registerDrinkerByIdError = (drinkerId, eventId) => {
  return {
    type: 'REGISTER_DRINKER_BY_ID_ERROR',
    drinkerId,
    eventId
  }
}
export const registerDrinkerByIdSuccess = (drinkerId, eventId) => {
  return {
    type: 'REGISTER_DRINKER_BY_ID_SUCCESS',
    drinkerId,
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
export const drinkerAlreadyRegistered = () => {
  return {
    type: 'DRINKER_ALREADY_REGISTERED'
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

export const checkRegistration = () => {
  return dispatch => {
    const registration = registrationHelper.get()
    if (registration) {
      dispatch(registerDrinkerSuccess(registration))
    }
  }
}

export const registerById = (data) => {
  return dispatch => {
    dispatch(drinkerBeingRegisteredById())
    return EventService.register(data)
      .then(response => response.data)
      .then(data => dispatch(registerDrinkerByIdSuccess(data.drinker._id, data.event._id)))
      .catch(_ => dispatch(registerDrinkerByIdError()))
  }
}

export const unregisterById = (data) => {
  return dispatch => {
    dispatch(drinkerBeingUnregisteredById())
    return EventService.unregister(data)
      .then(response => response.data)
      .then(data => dispatch(unregisterDrinkerByIdSuccess(data.drinker._id, data.event._id)))
      .catch(_ => dispatch(unregisterDrinkerByIdError()))
  }
}

export const register = () => {
  return dispatch => {
    dispatch(drinkerBeingRegistered())
    return EventService.register()
      .then(response => response.data)
      .then(data => {
        registrationHelper.set(data.event._id)
        return dispatch(registerDrinkerSuccess(data.event._id))
      })
      .catch(err => {
        if (err.response.status == 409) {
          registrationHelper.set(err.response.data.event._id)
          return dispatch(drinkerAlreadyRegistered())
        }
        return dispatch(registerDrinkerError())
      })
  }
}

export const unregister = () => {
  return dispatch => {
    dispatch(drinkerBeingUnregistered())
    return EventService.unregister()
      .then(response => response.data)
      .then(data => {
        registrationHelper.clean()
        return dispatch(unregisterDrinkerSuccess(data.drinker._id, data.event._id))
      })
      .catch(_ => dispatch(unregisterDrinkerError()))
  }
}

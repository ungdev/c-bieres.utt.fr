import EventService from '../services/EventService'

export const eventsAreLoading = () => {
  return {
    type: 'EVENTS_ARE_LOADING'
  }
}
export const fetchEventsError = () => {
  return {
    type: 'FETCH_EVENTS_ERROR'
  }
}
export const fetchEventsSuccess = (events) => {
  return {
    type: 'FETCH_EVENTS_SUCCESS',
    events
  }
}

export const nextEventIsLoading = () => {
  return {
    type: 'NEXT_EVENT_IS_LOADING'
  }
}
export const fetchNextEventError = () => {
  return {
    type: 'FETCH_NEXT_EVENT_ERROR'
  }
}
export const fetchNextEventSuccess = (event) => {
  return {
    type: 'FETCH_NEXT_EVENT_SUCCESS',
    event
  }
}

export const eventBeingDeleted = (id) => {
  return {
    type: 'EVENT_BEING_DELETED',
    id
  }
}
export const deleteEventError = (id) => {
  return {
    type: 'DELETE_EVENT_ERROR',
    id
  }
}
export const deleteEventSuccess = (id) => {
  return {
    type: 'DELETE_EVENT_SUCCESS',
    id
  }
}

export const eventBeingCreated = () => {
  return {
    type: 'EVENT_BEING_CREATED'
  }
}
export const createEventError = () => {
  return {
    type: 'CREATE_EVENT_ERROR'
  }
}
export const createEventSuccess = (event) => {
  return {
    type: 'CREATE_EVENT_SUCCESS',
    event
  }
}

export const eventBeingUpdated = (id) => {
  return {
    type: 'EVENT_BEING_UPDATED',
    id
  }
}
export const updateEventError = (id) => {
  return {
    type: 'UPDATE_EVENT_ERROR',
    id
  }
}
export const updateEventSuccess = (event) => {
  return {
    type: 'UPDATE_EVENT_SUCCESS',
    event
  }
}

export const updateEvent = (event) => {
  return dispatch => {
    dispatch(eventBeingUpdated())
    return EventService.update(event._id, event)
      .then(response => response.data)
      .then(_ => dispatch(updateEventSuccess(event)))
      .catch(_ => dispatch(updateEventError()))
  }
}

export const createEvent = (data) => {
  return dispatch => {
    dispatch(eventBeingCreated())
    return EventService.create(data)
      .then(response => response.data)
      .then(event => dispatch(createEventSuccess(event)))
      .catch(() => dispatch(createEventError()))
  }
}

export const deleteEvent = (id) => {
  return dispatch => {
    dispatch(eventBeingDeleted(id))
    return EventService.delete(id)
      .then(_ => dispatch(deleteEventSuccess(id)))
      .catch(_ => dispatch(deleteEventError(id)))
  }
}

export const fetchEvents = () => {
  return dispatch => {
    dispatch(eventsAreLoading())
    return EventService.get()
      .then(response => response.data)
      .then(events => dispatch(fetchEventsSuccess(events)))
      .catch(() => dispatch(fetchEventsError()))
  }
}

export const fetchNextEvent = () => {
  return dispatch => {
    dispatch(nextEventIsLoading())
    return EventService.getNext()
      .then(response => response.data)
      .then(event => dispatch(fetchNextEventSuccess(event)))
      .catch(() => dispatch(fetchNextEventError()))
  }
}

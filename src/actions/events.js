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

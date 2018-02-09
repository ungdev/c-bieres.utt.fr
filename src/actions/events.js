import EventService from '../services/EventService'

export const nextEventHasFailed = () => {
  return {
    type: 'NEXT_EVENT_HAS_FAILED'
  }
}

export const nextEventIsLoading = () => {
  return {
    type: 'NEXT_EVENT_IS_LOADING'
  }
}

export const fetchNextEventSuccess = (event) => {
  return {
    type: 'FETCH_NEXT_EVENT_SUCCESS',
    event
  }
}

export const fetchNextEvent = () => {
  return dispatch => {
    dispatch(nextEventIsLoading())
    return EventService.getNext()
      .then(response => response.data)
      .then(event => dispatch(fetchNextEventSuccess(event)))
      .catch(() => dispatch(nextEventHasFailed()))
  }
}

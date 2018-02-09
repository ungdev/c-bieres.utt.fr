import EventService from '../services/EventService'

export const fetchNextEventSuccess = (nextEvent) => {
  return {
    type: 'FETCH_NEXT_EVENT_SUCCESS',
    payload: nextEvent
  }
}

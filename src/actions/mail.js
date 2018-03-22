import EventService from '../services/EventService'

export const eventMailBeingSent = () => {
  return {
    type: 'EVENT_MAIL_BEING_SENT',
  }
}
export const eventMailError = () => {
  return {
    type: 'EVENT_MAIL_ERROR',
  }
}
export const eventMailSuccess = () => {
  return {
    type: 'EVENT_MAIL_SUCCESS',
  }
}

export const sendEventMail = (eventId) => {
  return dispatch => {
    dispatch(eventMailBeingSent())
    return EventService.sendEventMail(eventId)
      .then(_ => dispatch(eventMailSuccess()))
      .catch(_ => dispatch(eventMailError()))
  }
}

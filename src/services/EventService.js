import BaseService from './BaseService'

class EventService extends BaseService {

  constructor() {
    super('event')
  }

  /**
   * Make a request to get the next event
   *
   * @returns {Promise}
   */
  getNext() {
    return this.makeRequest({
        method: 'get',
        url: this._baseUrl + '/next'
    })
  }

  /**
   * Register the user to the next event
   *
   * @param {object} data : eventId and studentId (optional)
   * @return {Promise}
   */
  register(data = {}) {
    return this.makeRequest({
      method: 'post',
      url: this._baseUrl + '/register',
      data
    })
  }

  /**
   * Unregister a user to the next event
   *
   * @param {object} data : eventId and studentId (optional)
   * @return {Promise}
   */
  unregister(data = {}) {
    return this.makeRequest({
      method: 'post',
      url: this._baseUrl + '/unregister',
      data
    })
  }

  /**
   * Send a mail to all drinkers with the date of this event
   *
   * @param {String} id : eventId
   * @return {Promise}
   */
  sendEventMail(eventId) {
    return this.makeRequest({
      method: 'post',
      url: this._baseUrl + `/{eventId}/mail`,
      data: {
        eventId
      }
    })
  }

}

export default new EventService()

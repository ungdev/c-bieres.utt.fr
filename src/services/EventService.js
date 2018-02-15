import BaseService from './BaseService';

class EventService extends BaseService {

    constructor() {
        super('event');
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
        });
    }

    /**
     * Register the user to the next event
     *
     * @return {Promise}
     */
    register() {
      return this.makeRequest({
        method: 'post',
        url: this._baseUrl + '/next/register'
      })
    }

    registerById(data) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl + '/next/register/id',
            data
        });
    }

    /**
     * Unregister a user to the next event
     *
     * @return {Promise}
     */
    unregister() {
      return this.makeRequest({
        method: 'post',
        url: this._baseUrl + '/next/unregister',
      })
    }

    /**
     * Unregister a user to the next event
     *
     * @param {object} data
     * @return {Promise}
     */
    unregisterById(data) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl + '/next/unregister/id',
            data
        });
    }

}

export default new EventService();

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
     * @param string authorization_code
     * @return {Promise}
     */
    register(authorization_code) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl + '/next/register',
            data: {authorization_code}
        });
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
     * @param {object} data
     * @return {Promise}
     */
    unregister(data) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl + '/next/unregister',
            data
        });
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

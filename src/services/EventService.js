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

    /**
     * Unregister the user to the next event
     *
     * @param string authorization_code
     * @return {Promise}
     */
    unregister(authorization_code) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl + '/next/unregister',
            data: {authorization_code}
        });
    }

}

export default new EventService();

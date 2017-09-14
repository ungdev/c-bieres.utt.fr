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

}

export default new EventService();

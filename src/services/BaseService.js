const axios = require('axios');

const GLOBAL_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const REQUEST_TEMPLATE = {
    headers: GLOBAL_HEADERS
};

export default class BaseService {

    constructor(modelName) {
        this._modelName = modelName;
        this._baseUrl = process.env.SERVER_URI + "api/" + modelName;
    }

    /**
     * Make an ajax request
     *
     * @param object data : the request attributes
     * @return Promise
     */
     makeRequest(data) {
         return new Promise((resolve, reject) => {
             axios(Object.assign(data, REQUEST_TEMPLATE))
                .then(response => resolve(response))
                .catch(err => reject(err));
            });
    }

    /**
     * Make a get request
     *
     * @param {object} filters:
     * @returns {Promise}
     */
    get(filters = {}) {
        return this.makeRequest({
            method: 'get',
            url: this._baseUrl,
            data: {filters}
        });
    }

    /**
     * Make a request to get a document by his id
     *
     * @param id
     * @returns {Promise}
     */
    getById(id) {
        return this.makeRequest({
            method: 'get',
            url: this._baseUrl + '/' + id
        });
    }

    /**
     * Make a create request
     *
     * @param {object} data: the new object values
     * @returns {Promise}
     */
    create(data) {
        return this.makeRequest({
            method: 'post',
            url: this._baseUrl,
            data
        });
    }

    /**
     * Make an update request
     *
     * @param {string} id: the id of the object to update
     * @param {object} data: the new object values
     * @returns {Promise}
     */
    update(id, data) {
        return this.makeRequest({
            method: 'put',
            url: this._baseUrl + '/' + id,
            data
        });
    }

    /**
     * Make a destroy request
     *
     * @param id: the id of the object to delete
     * @returns {Promise}
     */
    delete(id) {
        return this.makeRequest({
            method: 'delete',
            url: this._baseUrl + '/' + id
        });
    }

}

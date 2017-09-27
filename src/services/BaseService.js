const axios = require('axios');
import authHelper from '../helpers/localStorage/authHelper';

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
             const headers = {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${authHelper.get()}`
             };

             axios(Object.assign(data, { headers }))
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
        let url = this._baseUrl;

        // apply filters
        const fields = Object.keys(filters);
        if (fields.length) {
            // build the query part of the uri using map-reduce
            url += '?' + fields.map(field => `${field}=${filters[field]}`).reduce((a, b) => a + '&' + b);
        }

        return this.makeRequest({
            method: 'get',
            url
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

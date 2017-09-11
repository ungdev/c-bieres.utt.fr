const axios = require('axios');

const GLOBAL_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

const REQUEST_TEMPLATE = {
    headers: GLOBAL_HEADERS
};

export default class BaseService {

    /**
     * Make an ajax request
     *
     * @param object data : the request attributes
     * @return Promise
     */
     makeRequest(data) {
         console.log(Object.assign(data, REQUEST_TEMPLATE));
         return new Promise((resolve, reject) => {
             axios(Object.assign(data, REQUEST_TEMPLATE))
                .then(response => resolve(response))
                .catch(err => reject(err));
            });
    }

}

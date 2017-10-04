const axios = require('axios');

import authHelper from '../helpers/localStorage/authHelper';
import AuthStore from '../stores/AuthStore';

class EtuuttService  {

    constructor() {
        this._apiUrl = "https://etu.utt.fr/api/public/";
    }

    /**
     * Make an ajax request to the étu utt API to get
     *
     * @param string pattern
     * @return Promise
     */
     getMatches(pattern) {
         const request = {
             headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',
                 'Authorization': `bearer ${AuthStore.accessToken}`
             },
             method: 'get',
             url: `${this._apiUrl}users?multifield=${pattern}`
         };

         return new Promise((resolve, reject) => {
             axios(request)
                .then(response => resolve(response))
                .catch(err => reject(err));
            });
    }

}

export default new EtuuttService();

import BaseService from './BaseService';

class AuthService extends BaseService {

    constructor() {
        super('oauth/etuutt');
    }

    getRedirectLink() {
        return this.makeRequest({
            method: "get",
            url: this._baseUrl + "/link"
        });
    }

    sendAuthorizationCode(authorization_code) {
        return this.makeRequest({
            method: "post",
            url: this._baseUrl + "/callback",
            data: {authorization_code}
        });
    }

}

export default new AuthService();

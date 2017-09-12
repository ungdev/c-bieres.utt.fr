import BaseService from './BaseService';

class AuthService extends BaseService {

    getRedirectLink() {
        return this.makeRequest({
            method: "get",
            url: "http://localhost:3000/api/oauth/etuutt/link"
        });
    }

    sendAuthorizationCode(authorization_code) {
        return this.makeRequest({
            method: "post",
            url: "http://localhost:3000/api/oauth/etuutt/callback",
            data: {authorization_code}
        });
    }

}

export default new AuthService();

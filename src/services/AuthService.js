import BaseService from './BaseService';

class AuthService extends BaseService {

    getRedirectLink() {
        return this.makeRequest({
            method: "get",
            url: "http://localhost:3000/api/oauth/etuutt/link"
        });
    }

}

export default new AuthService();

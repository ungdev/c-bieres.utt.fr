import BaseService from './BaseService'

class AuthService extends BaseService {

  constructor() {
    super('oauth')
  }

  getRedirectLink() {
    return this.makeRequest({
      method: "get",
      url: this._baseUrl + "/etuutt/link"
    })
  }

  sendAuthorizationCode(authorization_code) {
    return this.makeRequest({
      method: "post",
      url: this._baseUrl + "/etuutt/callback",
      data: {authorization_code}
    })
  }

  getAccount() {
    return this.makeRequest({
      method: "get",
      url: this._baseUrl + "/account"
    })
  }

  updateAccount(account) {
    return this.makeRequest({
      method: "put",
      url: this._baseUrl + "/account",
      data: {account}
    })
  }

}

export default new AuthService()

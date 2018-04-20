import AuthService from '../services/AuthService'
import authHelper from '../helpers/localStorage/authHelper'
import registrationHelper from '../helpers/localStorage/registrationHelper'
import jwtDecode from 'jwt-decode'

export const accountBeingFetched = () => {
  return {
    type: "ACCOUNT_BEING_FETCHED"
  }
}
export const fetchAccountError = () => {
  return {
    type: "FETCH_ACCOUNT_ERROR"
  }
}
export const fetchAccountSuccess = (account) => {
  return {
    type: "FETCH_ACCOUNT_SUCCESS",
    account
  }
}

export const accountBeingUpdated = () => {
  return {
    type: "ACCOUNT_BEING_UPDATED"
  }
}
export const updateAccountError = () => {
  return {
    type: "UPDATE_ACCOUNT_ERROR"
  }
}
export const updateAccountSuccess = () => {
  return {
    type: "UPDATE_ACCOUNT_SUCCESS"
  }
}

export const redirectLinkIsLoading = () => {
  return {
    type: "REDIRECT_LINK_IS_LOADING"
  }
}
export const fetchRedirectLinkError = () => {
  return {
    type: "FETCH_REDIRECT_LINK_ERROR"
  }
}

export const authorizationCodeIsSent = () => {
  return {
    type: "AUTHORIZATION_CODE_IS_SENT"
  }
}
export const authorizationCodeError = () => {
  return {
    type: "AUTHORIZATION_CODE_ERROR"
  }
}
export const authorizationCodeSuccess = (jwt, payload) => {
  return {
    type: "AUTHORIZATION_CODE_SUCCESS",
    jwt,
    payload
  }
}
export const loginSuccess = () => {
  return {
    type: "LOGIN_SUCCESS"
  }
}

export const logout = () => {
  authHelper.clean()
  registrationHelper.clean()
  return {
    type: 'LOGOUT'
  }
}

export const checkExistingJWT = () => {
  return dispatch => {
    const jwt = authHelper.get()
    if (jwt) {
      dispatch(authorizationCodeSuccess(jwt, jwtDecode(jwt)))
    }
  }
}

export const login = () => {
  return dispatch => {
    dispatch(redirectLinkIsLoading())
    return AuthService.getRedirectLink()
      .then(response => response.data.redirectUri)
      .then(link => window.location.replace(link))
      .catch(_ => dispatch(fetchRedirectLinkError()))
  }
}

export const sendAuthorizationCode = (authorization_code) => {
  return dispatch => {
    dispatch(authorizationCodeIsSent())
    return AuthService.sendAuthorizationCode(authorization_code)
      .then(response => response.data)
      .then(jwt => {
        authHelper.set(jwt)
        dispatch(loginSuccess())
        return dispatch(authorizationCodeSuccess(jwt, jwtDecode(jwt)))
      })
      .catch(_ => dispatch(authorizationCodeError()))
  }
}

export const fetchAccount = () => {
  return dispatch => {
    dispatch(accountBeingFetched())
    return AuthService.getAccount()
      .then(response => response.data)
      .then(account => dispatch(fetchAccountSuccess(account)))
      .catch(() => dispatch(fetchAccountError()))
  }
}

export const updateAccount = (account) => {
  return dispatch => {
    dispatch(accountBeingUpdated())
    return AuthService.updateAccount(account)
      .then(response => response.data)
      .then(account => dispatch(updateAccountSuccess(account)))
      .catch(() => dispatch(updateAccountError()))
  }
}

import AuthService from '../services/AuthService'
import redirectHelper from '../helpers/localStorage/redirectHelper'
import authHelper from '../helpers/localStorage/authHelper'
import jwtDecode from 'jwt-decode'

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

/**
 * @param  {string} action There is many cases for which a user want to
 * authenticate himself: auth to dashboard, register/unregister to an event.
 * This case has to be save in the localStorage
 */
export const fetchRedirectLink = (action) => {
  return dispatch => {
    dispatch(redirectLinkIsLoading())
    redirectHelper.set(action)
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
        return dispatch(authorizationCodeSuccess(jwt, jwtDecode(jwt)))
      })
      .catch(_ => dispatch(authorizationCodeError()))
  }
}

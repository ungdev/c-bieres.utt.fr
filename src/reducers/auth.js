const initialState = {
  jwt: null,
  payload: {},
  redirectLinkIsLoading: false,
  redirectLinkError: false,
  authorizationCodeIsSent: false,
  authorizationCodeError: false
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "REDIRECT_LINK_IS_LOADING":
      return Object.assign({}, state, {
        redirectLinkIsLoading: true,
        redirectLinkError: false
      })
    case "FETCH_REDIRECT_LINK_ERROR":
      return Object.assign({}, state, {
        redirectLinkIsLoading: false,
        redirectLinkError: true
      })
    case "AUTHORIZATION_CODE_IS_SENT":
      return Object.assign({}, state, {
        authorizationCodeIsSent: true,
        authorizationCodeError: false
      })
    case "AUTHORIZATION_CODE_ERROR":
      return Object.assign({}, state, {
        authorizationCodeIsSent: false,
        authorizationCodeError: true
      })
    case "AUTHORIZATION_CODE_SUCCESS":
      return Object.assign({}, state, {
        authorizationCodeIsSent: false,
        authorizationCodeError: false,
        jwt: action.jwt,
        payload: action.payload
      })
    default:
      return state
  }
}

export default auth

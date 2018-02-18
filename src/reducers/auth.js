const initialState = {
  jwt: null,
  payload: {},
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "REDIRECT_LINK_IS_LOADING":
      return Object.assign({}, state, {})
    case "FETCH_REDIRECT_LINK_ERROR":
      return Object.assign({}, state, {})
    case "AUTHORIZATION_CODE_IS_SENT":
      return Object.assign({}, state, {})
    case "AUTHORIZATION_CODE_ERROR":
      return Object.assign({}, state, {})
    case "AUTHORIZATION_CODE_SUCCESS":
      return Object.assign({}, state, {
        jwt: action.jwt,
        payload: action.payload
      })
    default:
      return state
  }
}

export default auth

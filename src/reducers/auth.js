const initialState = {
  jwt: null,
  payload: {},
  account: {}
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHORIZATION_CODE_SUCCESS":
      return Object.assign({}, state, {
        jwt: action.jwt,
        payload: action.payload
      })
    case "FETCH_ACCOUNT_SUCCESS":
      return Object.assign({}, state, {
        account: action.account
      })
    case "UPDATE_ACCOUNT_SUCCESS":
      return Object.assign({}, state, {
        account: Object.assign({}, state.account, {
          inMailList: !state.account.inMailList
        })
      })
    default:
      return state
  }
}

export default auth

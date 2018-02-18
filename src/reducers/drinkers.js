const initialState = {
  items: {
    fromServer: [],
    fromEtuutt: []
  }
}

const drinkers = (state = initialState, action) => {
  switch (action.type) {
    case "ETUUTT_DRINKERS_ARE_LOADING":
      return Object.assign({}, state, {})
    case "ETUUTT_FETCH_DRINKERS_ERROR":
      return Object.assign({}, state, {})
    case "ETUUTT_FETCH_DRINKERS_SUCCESS":
      return Object.assign({}, state, {
        items: Object.assign({}, state.items, {
          fromEtuutt: action.drinkers
        })
      })
    case "SERVER_DRINKERS_ARE_LOADING":
      return Object.assign({}, state, {})
    case "SERVER_FETCH_DRINKERS_ERROR":
      return Object.assign({}, state, {})
    case "SERVER_FETCH_DRINKERS_SUCCESS":
      return Object.assign({}, state, {
        items: Object.assign({}, state.items, {
          fromServer: action.drinkers
        })
      })
    default:
      return state
  }
}

export default drinkers

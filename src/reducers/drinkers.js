const initialState = {
  items: {
    fromServer: [],
    fromEtuutt: []
  },
  etuuttItemsAreLoading: false,
  etuuttItemsHaveFailed: false,
  serverItemsAreLoading: false,
  serverItemsHaveFailed: false,
  itemBeingCreated: false,
  createHasFailed: false,
}

const drinkers = (state = initialState, action) => {
  switch (action.type) {
    case "ETUUTT_DRINKERS_ARE_LOADING":
      return Object.assign({}, state, {
        etuuttItemsAreLoading: true,
        etuuttItemsHaveFailed: false
      })
    case "ETUUTT_FETCH_DRINKERS_ERROR":
      return Object.assign({}, state, {
        etuuttItemsAreLoading: false,
        etuuttItemsHaveFailed: true
      })
    case "ETUUTT_FETCH_DRINKERS_SUCCESS":
      return Object.assign({}, state, {
        etuuttItemsAreLoading: false,
        etuuttItemsHaveFailed: false,
        items: Object.assign({}, state.items, {
          fromEtuutt: action.drinkers
        })
      })
    case "SERVER_DRINKERS_ARE_LOADING":
      return Object.assign({}, state, {
        serverItemsAreLoading: true,
        serverItemsHaveFailed: false
      })
    case "SERVER_FETCH_DRINKERS_ERROR":
      return Object.assign({}, state, {
        serverItemsAreLoading: false,
        serverItemsHaveFailed: true
      })
    case "SERVER_FETCH_DRINKERS_SUCCESS":
      return Object.assign({}, state, {
        serverItemsAreLoading: false,
        serverItemsHaveFailed: false,
        items: Object.assign({}, state.items, {
          fromServer: action.drinkers
        })
      })
    default:
      return state
  }
}

export default drinkers

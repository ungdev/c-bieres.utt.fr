const initialState = {
  items: [],
  next: null,
  isLoading: false,
  hasFailed: false
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEXT_EVENT_SUCCESS':
      return Object.assign({}, state, {
        isLoading: false,
        hasFailed: false,
        next: action.event._id,
        // push only if not already in
        items: state.items.filter(event => event._id === action.event._id).length
              ? state.items
              : [...state.items, action.event]
      })
    case 'NEXT_EVENT_HAS_FAILED':
      return Object.assign({}, state, {
        isLoading: false,
        hasFailed: true
      })
    case 'NEXT_EVENT_IS_LOADING':
      return Object.assign({}, state, {
        isLoading: true,
        hasFailed: false
      })
    default:
      return state
  }
}

export default events

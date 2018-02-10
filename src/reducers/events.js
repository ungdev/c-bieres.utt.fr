const initialState = {
  items: [],
  itemsAreLoading: false,
  itemsHaveFailed: false,

  next: null,
  nextIsLoading: false,
  nextHasFailed: false,

  itemBeingDeleted: null,
  deleteHasFailed: null
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        itemBeingDeleted: null,
        deleteHasFailed: null,
        items: state.items.filter(item => item._id !== action.id)
      })
    case 'DELETE_EVENT_ERROR':
      return Object.assign({}, state, {
        itemBeingDeleted: null,
        deleteHasFailed: action.id
      })
    case 'EVENT_BEING_DELETED':
      return Object.assign({}, state, {
        itemBeingDeleted: action.id,
        deleteHasFailed: null
      })
    case 'FETCH_EVENTS_SUCCESS':
      return Object.assign({}, state, {
        itemsAreLoading: false,
        itemsHaveFailed: false,
        items: action.events
      })
    case 'FETCH_EVENTS_ERROR':
      return Object.assign({}, state, {
        itemsAreLoading: false,
        itemsHaveFailed: true
      })
    case 'EVENTS_ARE_LOADING':
      return Object.assign({}, state, {
        itemsAreLoading: true,
        itemsHaveFailed: false
      })
    case 'FETCH_NEXT_EVENT_SUCCESS':
      return Object.assign({}, state, {
        nextIsLoading: false,
        nextHasFailed: false,
        next: action.event._id,
        // push only if not already in
        items: state.items.filter(event => event._id === action.event._id).length
              ? state.items
              : [...state.items, action.event]
      })
    case 'FETCH_NEXT_EVENT_ERROR':
      return Object.assign({}, state, {
        nextIsLoading: false,
        nextHasFailed: true
      })
    case 'NEXT_EVENT_IS_LOADING':
      return Object.assign({}, state, {
        nextIsLoading: true,
        nextHasFailed: false
      })
    default:
      return state
  }
}

export default events

const initialState = {
  items: [],
  matches: [],
  itemsAreLoading: false,
  itemsHaveFailed: false,
  itemBeingAdded: false,
  addHasFailed: false,
  itemBeingDeleted: null,
  deleteHasFailed: null,
  matchesAreLoading: null,
  matchesHaveFailed: null
}

const admins = (state = initialState, action) => {
  switch (action.type) {
    case 'MATCHES_ARE_LOADING':
      return Object.assign({}, state, {
        matchesAreLoading: action.pattern,
        matchesHaveFailed: null
      })
    case 'FETCH_MATCHES_ERROR':
      return Object.assign({}, state, {
        matchesAreLoading: null,
        matchesHaveFailed: action.pattern
      })
    case 'FETCH_MATCHES_SUCCESS':
      return Object.assign({}, state, {
        matchesAreLoading: null,
        matchesHaveFailed: null,
        matches: action.matches
      })
    case 'FETCH_ADMINS_SUCCESS':
      return Object.assign({}, state, {
        itemsAreLoading: false,
        itemsHaveFailed: false,
        items: action.admins
      })
    case 'FETCH_ADMINS_ERROR':
      return Object.assign({}, state, {
        itemsAreLoading: false,
        itemsHaveFailed: true
      })
    case 'ADMINS_ARE_LOADING':
      return Object.assign({}, state, {
        itemsAreLoading: true,
        itemsHaveFailed: false
      })
    case 'ADMIN_BEING_DELETED':
      return Object.assign({}, state, {
        itemBeingDeleted: action.id,
        deleteHasFailed: null
      })
    case 'DELETE_ADMIN_ERROR':
      return Object.assign({}, state, {
        itemBeingDeleted: null,
        deleteHasFailed: action.id
      })
    case 'DELETE_ADMIN_SUCCESS':
      return Object.assign({}, state, {
        itemBeingDeleted: null,
        deleteHasFailed: null,
        items: state.items.filter(item => item._id != action.id)
      })
    case 'ADMIN_BEING_ADDED':
      return Object.assign({}, state, {
        itemBeingAdded: action.admin,
        addHasFailed: null
      })
    case 'ADD_ADMIN_ERROR':
      return Object.assign({}, state, {
        itemBeingAdded: null,
        addHasFailed: action.admin
      })
    case 'ADD_ADMIN_SUCCESS':
      return Object.assign({}, state, {
        itemBeingAdded: null,
        addHasFailed: null,
        items: [...state.items, action.admin]
      })
    default:
      return state
  }
}

export default admins

const initialState = {
  items: [],
  matches: [],
  fetchingMatches: false,
  fetchingAdmins: false,
}

const admins = (state = initialState, action) => {
  switch (action.type) {
    // fetch matches
    case 'MATCHES_ARE_LOADING':
      return Object.assign({}, state, {
        fetchingMatches: true
      })
    case 'FETCH_MATCHES_ERROR':
      return Object.assign({}, state, {
        fetchingMatches: false
      })
    case 'FETCH_MATCHES_SUCCESS':
      return Object.assign({}, state, {
        matches: action.matches,
        fetchingMatches: false
      })
    // fetch all admins
    case 'ADMINS_ARE_LOADING':
      return Object.assign({}, state, {
        fetchingAdmins: true
      })
    case 'FETCH_ADMINS_ERROR':
      return Object.assign({}, state, {
        fetchingAdmins: false
      })
    case 'FETCH_ADMINS_SUCCESS':
      return Object.assign({}, state, {
        items: action.admins,
        fetchingAdmins: false
      })
    // delete admin
    case 'ADMIN_BEING_DELETED':
      return Object.assign({}, state, {})
    case 'DELETE_ADMIN_ERROR':
      return Object.assign({}, state, {})
    case 'DELETE_ADMIN_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.filter(item => item._id != action.id)
      })
    // add an admin
    case 'ADMIN_BEING_ADDED':
      return Object.assign({}, state, {})
    case 'ADD_ADMIN_ERROR':
      return Object.assign({}, state, {})
    case 'ADD_ADMIN_SUCCESS':
      return Object.assign({}, state, {
        items: [...state.items, action.admin]
      })
    default:
      return state
  }
}

export default admins

const initialState = {
  all: [],
  next: null
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_NEXT_EVENT_SUCCESS':
      console.log('STATE', state.all)
      return Object.assign({}, state, {
        next: action.payload._id,
        // push only if not already in
        all: state.all.filter(event => event._id === action.payload._id).length
              ? state.all
              : [...state.all, action.payload]
      })
    default:
      return state
  }
}

export default events

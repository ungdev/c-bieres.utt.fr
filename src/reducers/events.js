const initialState = {
  items: [],
  next: null,
  itemsAreLoading: false,
  itemsHaveFailed: false,
  nextIsLoading: false,
  nextHasFailed: false,
  itemBeingCreated: false,
  createHasFailed: false,
  itemBeingDeleted: null,
  deleteHasFailed: null,
  itemBeingUpdated: null,
  updateHasFailed: null,
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        itemBeingUpdated: false,
        updateHasFailed: false,
        items: state.items.map(item => item._id == action.event._id ? action.event : item)
      })
    case 'UPDATE_EVENT_ERROR':
      return Object.assign({}, state, {
        itemBeingUpdated: null,
        updateHasFailed: action.id
      })
    case 'EVENT_BEING_UPDATED':
      return Object.assign({}, state, {
        itemBeingUpdated: action.id,
        updateHasFailed: null
      })
    case 'CREATE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        itemBeingCreated: false,
        createHasFailed: false,
        items: [...state.items, action.event]
      })
    case 'CREATE_EVENT_ERROR':
      return Object.assign({}, state, {
        itemBeingCreated: false,
        createHasFailed: true
      })
    case 'EVENT_BEING_CREATED':
      return Object.assign({}, state, {
        itemBeingCreated: true,
        createHasFailed: false
      })
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
    // beers event
    case 'DELETE_BEER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.eventId)
            event.beers = event.beers.filter(beer => beer._id != action.beerId)
          return event
        })
      })
    case 'CREATE_BEER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.beer.event_id)
            event.beers = [...event.beers, action.beer]
          return event
        })
      })
    case 'UPDATE_BEER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.beer.event_id)
            event.beers = event.beers.map(beer => {
              if (beer._id == action.beer._id)
                return action.beer
              return beer
            })
          return event
        })
      })
    default:
      return state
  }
}

export default events

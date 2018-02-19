const initialState = {
  items: [],
  next: null
}

const events = (state = initialState, action) => {
  switch (action.type) {
    // update event
    case 'UPDATE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(item => item._id == action.event._id ? action.event : item)
      })
    case 'UPDATE_EVENT_ERROR':
      return Object.assign({}, state, {})
    case 'EVENT_BEING_UPDATED':
      return Object.assign({}, state, {})
    // create event
    case 'CREATE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        items: [...state.items, action.event]
      })
    case 'CREATE_EVENT_ERROR':
      return Object.assign({}, state, {})
    case 'EVENT_BEING_CREATED':
      return Object.assign({}, state, {})
    // delete event
    case 'DELETE_EVENT_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.filter(item => item._id !== action.id)
      })
    case 'DELETE_EVENT_ERROR':
      return Object.assign({}, state, {})
    case 'EVENT_BEING_DELETED':
      return Object.assign({}, state, {})
    // fetch events
    case 'FETCH_EVENTS_SUCCESS':
      return Object.assign({}, state, {
        items: action.events
      })
    case 'FETCH_EVENTS_ERROR':
      return Object.assign({}, state, {})
    case 'EVENTS_ARE_LOADING':
      return Object.assign({}, state, {})
    // fetch next event
    case 'FETCH_NEXT_EVENT_SUCCESS':
      return Object.assign({}, state, {
        next: action.event._id,
        // push only if not already in
        items: state.items.filter(event => event._id === action.event._id).length
          ? state.items
          : [...state.items, action.event]
      })
    case 'FETCH_NEXT_EVENT_ERROR':
      return Object.assign({}, state, {})
    case 'NEXT_EVENT_IS_LOADING':
      return Object.assign({}, state, {})
    // delete beer
    case 'DELETE_BEER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.eventId)
            return Object.assign({}, event, {
              beers: event.beers.filter(beer => beer._id != action.beerId)
            })
          return event
        })
      })
    // create beer
    case 'CREATE_BEER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.beer.event_id)
            return Object.assign({}, event, {
              beers: [...event.beers, action.beer]
            })
          return event
        })
      })
    // update beer
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
    // create drinker
    case 'CREATE_DRINKER_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.drinker.events[0])
            return Object.assign({}, event, {
              drinkers: [...event.drinkers, action.drinker]
            })
          return event
        })
      })
    // registration / unregistration
    case 'UNREGISTER_DRINKER_BY_ID_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.eventId)
            return Object.assign({}, event, {
              drinkers: event.drinkers.filter(drinker => drinker._id != action.drinkerId)
            })
          return event
        })
      })
    case 'REGISTER_DRINKER_BY_ID_SUCCESS':
      return Object.assign({}, state, {
        items: state.items.map(event => {
          if (event._id == action.eventId)
            return Object.assign({}, event, {
              drinkers: [...event.drinkers, action.drinker]
            })
          return event
        })
      })
    default:
      return state
  }
}

export default events

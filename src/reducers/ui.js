const initialState = {
  showEventCreateForm: false,
  showDrinkerCreateForm: false,
  showCreateBeerForm: false,
  showRegistrationForm: false,
}

const ui = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_EVENT_SUCCESS":
    case "TOGGLE_EVENT_CREATE_FORM":
      return Object.assign({}, state, {
        showEventCreateForm: !state.showEventCreateForm
      })
    case "CREATE_DRINKER_SUCCESS":
    case "TOGGLE_DRINKER_CREATE_FORM":
      return Object.assign({}, state, {
        showDrinkerCreateForm: !state.showDrinkerCreateForm
      })
    case "REGISTER_DRINKER_BY_ID_SUCCESS":
    case "TOGGLE_REGISTRATION_FORM":
      return Object.assign({}, state, {
        showRegistrationForm: !state.showRegistrationForm
      })
    case "TOGGLE_CREATE_BEER_FORM":
      return Object.assign({}, state, {
        showCreateBeerForm: !state.showCreateBeerForm
      })
    default:
      return state
  }
}

export default ui

import DrinkerService from '../services/DrinkerService'
import EtuuttService from '../services/EtuuttService'

export const etuuttDrinkersAreLoading = () => {
  return {
    type: 'ETUUTT_DRINKERS_ARE_LOADING'
  }
}
export const etuuttFetchDrinkersError = () => {
  return {
    type: 'ETUUTT_FETCH_DRINKERS_ERROR'
  }
}
export const etuuttFetchDrinkersSuccess = (drinkers) => {
  return {
    type: 'ETUUTT_FETCH_DRINKERS_SUCCESS',
    drinkers
  }
}

export const serverDrinkersAreLoading = () => {
  return {
    type: 'SERVER_DRINKERS_ARE_LOADING'
  }
}
export const serverFetchDrinkersError = () => {
  return {
    type: 'SERVER_FETCH_DRINKERS_ERROR'
  }
}
export const serverFetchDrinkersSuccess = (drinkers) => {
  return {
    type: 'SERVER_FETCH_DRINKERS_SUCCESS',
    drinkers
  }
}

export const drinkerBeingCreated = () => {
  return {
    type: 'DRINKER_BEING_CREATED'
  }
}
export const createDrinkerError = () => {
  return {
    type: 'CREATE_DRINKER_ERROR'
  }
}
export const createDrinkerSuccess = (drinker) => {
  return {
    type: 'CREATE_DRINKER_SUCCESS',
    drinker
  }
}

export const createDrinker = (data) => {
  return dispatch => {
    dispatch(drinkerBeingCreated())
    return DrinkerService.create(data)
      .then(response => response.data)
      .then(drinker => createDrinkerSuccess(drinker))
      .catch(_ => dispatch(createDrinkerError()))
  }
}

export const fetchEtuuttDrinkers = (filters) => {
  return dispatch => {
    dispatch(etuuttDrinkersAreLoading())
    return EtuuttService.getMatches(filters.multifield)
      .then(response => response.data.data)
      .then(drinkers => dispatch(etuuttFetchDrinkersSuccess(drinkers)))
      .catch(_ => dispatch(etuuttFetchDrinkersError()))
  }
}

export const fetchServerDrinkers = (filters) => {
  return dispatch => {
    dispatch(serverDrinkersAreLoading())
    return DrinkerService.get(filters)
      .then(response => response.data)
      .then(drinkers => dispatch(serverFetchDrinkersSuccess(drinkers)))
      .catch(_ => dispatch(serverFetchDrinkersError()))
  }
}

export const fetchDrinkers = (filters) => {
  return dispatch => Promise.all([
    dispatch(fetchEtuuttDrinkers(filters)),
    dispatch(fetchServerDrinkers(filters))
  ])
}

import BeerService from '../services/BeerService'

export const beerBeingDeleted = (id) => {
  return {
    type: 'BEER_BEING_DELETED',
    id
  }
}
export const deleteBeerError = (id) => {
  return {
    type: 'DELETE_BEER_ERROR',
    id
  }
}
export const deleteBeerSuccess = (beerId, eventId) => {
  return {
    type: 'DELETE_BEER_SUCCESS',
    beerId,
    eventId
  }
}

export const beerBeingCreated = () => {
  return {
    type: 'BEER_BEING_CREATED'
  }
}
export const createBeerError = () => {
  return {
    type: 'CREATE_BEER_ERROR'
  }
}
export const createBeerSuccess = (beer) => {
  return {
    type: 'CREATE_BEER_SUCCESS',
    beer
  }
}
export const toggleCreateBeerForm = () => {
  return {
    type: 'TOGGLE_CREATE_BEER_FORM'
  }
}

export const beerBeingUpdated = (id) => {
  return {
    type: 'BEER_BEING_UPDATED',
    id
  }
}
export const updateBeerError = (id) => {
  return {
    type: 'UPDATE_BEER_ERROR',
    id
  }
}
export const updateBeerSuccess = (beer) => {
  return {
    type: 'UPDATE_BEER_SUCCESS',
    beer
  }
}

export const updateBeer = (beer) => {
  return dispatch => {
    dispatch(beerBeingUpdated())
    return BeerService.update(beer._id, beer)
      .then(_ => dispatch(updateBeerSuccess(beer)))
      .catch(_ => dispatch(updateBeerError()))
  }
}

export const createBeer = (data) => {
  return dispatch => {
    dispatch(beerBeingCreated())
    return BeerService.create(data)
      .then(response => response.data)
      .then(beer => dispatch(createBeerSuccess(beer)))
      .catch(_ => dispatch(createBeerError()))
  }
}

export const deleteBeer = (beerId, eventId) => {
  return dispatch => {
    dispatch(beerBeingDeleted(beerId, eventId))
    return BeerService.delete(beerId)
      .then(_ => dispatch(deleteBeerSuccess(beerId, eventId)))
      .catch(_ => dispatch(deleteBeerError(beerId, eventId)))
  }
}

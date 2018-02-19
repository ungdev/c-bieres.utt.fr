import { connect } from 'react-redux'
import { updateEvent, deleteBeer, createBeer, updateBeer, toggleCreateBeerForm } from '../actions'
import UpdateEvent from '../components/UpdateEvent'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0],
    showCreateBeerForm: state.ui.showCreateBeerForm
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteBeer: (beerId) => dispatch(deleteBeer(beerId, ownProps.match.params.id)),
    createBeer: (beer) => dispatch(createBeer(beer)),
    updateBeer: (beer) => dispatch(updateBeer(beer)),
    toggleCreateBeerForm: () => dispatch(toggleCreateBeerForm())
  }
}

const UpdateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEvent)

export default UpdateEventContainer

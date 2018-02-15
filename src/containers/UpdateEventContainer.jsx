import { connect } from 'react-redux'
import { updateEvent, deleteEvent, deleteBeer, createBeer, updateBeer } from '../actions'
import UpdateEvent from '../components/UpdateEvent'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteEvent: () => dispatch(deleteEvent(ownProps.match.params.id)),
    deleteBeer: (beerId) => dispatch(deleteBeer(beerId, ownProps.match.params.id)),
    createBeer: (beer) => dispatch(createBeer(beer)),
    updateBeer: (beer) => dispatch(updateBeer(beer))
  }
}

const UpdateEventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateEvent)

export default UpdateEventContainer

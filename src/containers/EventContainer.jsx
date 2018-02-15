import { connect } from 'react-redux'
import { fetchEvents, unregisterById, fetchDrinkers, createDrinker, registerById } from '../actions'
import Event from '../components/Event'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0],
    etuuttDrinkers: state.drinkers.items.fromEtuutt,
    serverDrinkers: state.drinkers.items.fromServer,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    unregisterById: (data) => dispatch(unregisterById(data)),
    fetchDrinkers: (fiters) => dispatch(fetchDrinkers(fiters)),
    createDrinker: (data) => dispatch(createDrinker(data)),
    registerById: (drinkerId, eventId) => dispatch(registerById(drinkerId, eventId))
  }
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer

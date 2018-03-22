import { connect } from 'react-redux'
import { fetchEvents, unregisterById, fetchDrinkers, createDrinker, registerById, toggleRegistrationForm,
  toggleDrinkerCreateForm, sendEventMail } from '../actions'
import Event from '../components/Event'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0],
    etuuttDrinkers: state.drinkers.items.fromEtuutt,
    serverDrinkers: state.drinkers.items.fromServer,
    showRegistrationForm: state.ui.showRegistrationForm,
    showCreateForm: state.ui.showDrinkerCreateForm,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    unregisterById: (data) => dispatch(unregisterById(data)),
    fetchDrinkers: (fiters) => dispatch(fetchDrinkers(fiters)),
    createDrinker: (data) => dispatch(createDrinker(data)),
    registerById: (drinker, eventId) => dispatch(registerById(drinker, eventId)),
    toggleRegistrationForm: () => dispatch(toggleRegistrationForm()),
    toggleCreateForm: () => dispatch(toggleDrinkerCreateForm()),
    sendEventMail: () => dispatch(sendEventMail(ownProps.match.params.id))
  }
}

const EventContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Event)

export default EventContainer

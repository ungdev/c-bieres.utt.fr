import { connect } from 'react-redux'
import { fetchEvents, createEvent, toggleEventCreateForm, deleteEvent } from '../actions'
import Events from '../components/Events'

const mapStateToProps = state => {
  return {
    // sort by date
    events: state.events.items
      .sort((a, b) => new Date(b.when) - new Date(a.when)),
    showCreateForm: state.ui.showEventCreateForm,
    fetchingEvents: state.events.fetchingEvents
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    createEvent: (data) => dispatch(createEvent(data)),
    toggleCreateForm: () => dispatch(toggleEventCreateForm()),
    deleteEvent: (id) => dispatch(deleteEvent(id)),
  }
}

const EventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

export default EventsContainer

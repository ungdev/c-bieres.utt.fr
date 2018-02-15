import { connect } from 'react-redux'
import { fetchEvents, createEvent } from '../actions'
import Events from '../components/Events'

const mapStateToProps = state => {
  return {
    // sort by date
    events: state.events.items
      .sort((a, b) => new Date(b.when) - new Date(a.when)),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
    createEvent: (data) => dispatch(createEvent(data))
  }
}

const EventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

export default EventsContainer

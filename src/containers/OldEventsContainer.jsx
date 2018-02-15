import { connect } from 'react-redux'
import OldEvents from '../components/OldEvents'

import { fetchEvents } from '../actions'

const mapStateToProps = state => {
  return {
    // only past events, sorted by date
    events: state.events.items
      .filter(event => new Date(event.when) < new Date())
      .sort((a, b) => new Date(b.when) - new Date(a.when)),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  }
}

const OldEventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OldEvents)

export default OldEventsContainer

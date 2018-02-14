import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import OldEvents from '../components/olds/OldEvents'

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
    goHome: () => dispatch(push('/')),
    fetchEvents: () => dispatch(fetchEvents()),
    goOldEvent: (id) => dispatch(push(`/olds/${id}`))
  }
}

const OldEventsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(OldEvents)

export default OldEventsContainer

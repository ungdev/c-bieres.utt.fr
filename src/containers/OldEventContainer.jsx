import { connect } from 'react-redux'
import OldEvent from '../components/OldEvent'

import { fetchEvents } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items
      .filter(event => event._id == ownProps.match.params.id)[0],
  }
}

const OldEventContainer = connect(
  mapStateToProps,
  null
)(OldEvent)

export default OldEventContainer

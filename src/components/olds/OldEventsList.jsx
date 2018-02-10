import React from 'react'
import { connect } from 'react-redux'

import OldEventsListItem from './OldEventsListItem'
import { fetchEvents } from '../../actions'

const mapStateToProps = state => {
  return {
    // only past events, sorted by date
    events: state.events.items
      .filter(event => new Date(event.when) < new Date())
      .sort((a, b) => new Date(b.when) - new Date(a.when)),
    areLoading: state.events.itemsAreLoading,
    haveFailed: state.events.itemsHaveFailed,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

class OldEventsList extends React.Component {

  constructor() {
    super();
    this._showOldEvent = this._showOldEvent.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  _showOldEvent(id) {
    this.props.history.push(`/olds/${id}`);
  }

  render() {
    return (
      <div className="container">
        <table className="table table-hover table-striped old-events__table">
          <tbody>
            {this.props.events.map((event, i) => <OldEventsListItem
                                                key={i}
                                                event={event}
                                                eventDate={new Date(event.when)}
                                                onClick={this._showOldEvent} />)}
          </tbody>
        </table>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OldEventsList)

import React from 'react'
import { connect } from 'react-redux'

import CreateEvent          from './CreateEvent';
import EventsList           from './EventsList';
import Alert                from '../../pieces/Alert';

import { fetchEvents } from '../../../actions'

const mapStateToProps = state => {
  return {
    // only past events, sorted by date
    events: state.events.items
      .sort((a, b) => new Date(b.when) - new Date(a.when)),
    areLoading: state.events.itemsAreLoading,
    haveFailed: state.events.itemsHaveFailed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

class Event extends React.Component {

  constructor() {
    super();

    this.state = {
        showCreateForm: false
    };

    this._toggleCreateForm = this._toggleCreateForm.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  _toggleCreateForm() {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  }

  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3 text-center">Evènements</h1>
          <hr className="my-4" />
          <div className="row justify-content-md-center">
            <div className="col col-md-4">
              <CreateEvent
                  showForm={this.state.showCreateForm}
                  toggle={this._toggleCreateForm} />
            </div>
          </div>
        </div>
        <EventsList events={this.props.events} />
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(Event)

import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

import CreateEvent          from './CreateEvent';
import EventsTable           from './EventsTable';
import Alert                from './pieces/Alert';

const Events = createReactClass({
  getInitialState() {
    return {showCreateForm: false}
  },
  componentDidMount() {
    this.props.fetchEvents()
  },
  toggleCreateForm() {
    this.setState({ showCreateForm: !this.state.showCreateForm })
  },
  render() {
    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3 text-center">Evènements</h1>
          <hr className="my-4" />
          <div className="row justify-content-md-center">
            <div className="col col-md-4">
              <CreateEvent
                createEvent={this.props.createEvent}
                showForm={this.state.showCreateForm}
                toggle={this.toggleCreateForm} />
            </div>
          </div>
        </div>
        <EventsTable events={this.props.events} />
      </div>
    )
  }
})

export default Events

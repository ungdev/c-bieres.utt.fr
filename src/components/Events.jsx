import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

import CreateEvent from './CreateEvent'
import EventsTable from './EventsTable'
import Alert from './Alert'
import Loader from './Loader'

const Events = createReactClass({
  componentDidMount() {
    this.props.fetchEvents()
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
                showForm={this.props.showCreateForm}
                toggle={this.props.toggleCreateForm} />
            </div>
          </div>
        </div>
        {
          this.props.fetchingEvents
            ? <Loader />
            : <EventsTable events={this.props.events} deleteEvent={this.props.deleteEvent} />
        }
      </div>
    )
  }
})

export default Events

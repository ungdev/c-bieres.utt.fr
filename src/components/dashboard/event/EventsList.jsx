import React from 'react';

import { Link } from 'react-router-dom';

import EventsListItem   from './EventsListItem';
import Alert            from '../../pieces/Alert';

export default class EventsList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      eventToDelete: null
    };

    this._showConfirmation = this._showConfirmation.bind(this);
    this._hideConfirmation = this._hideConfirmation.bind(this);
  }

  _showConfirmation(eventToDelete) {
    this.setState({ eventToDelete });
  }

  _hideConfirmation() {
    this.setState({ eventToDelete: null });
  }

  render() {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.events.map(event => {
                let eventDate = new Date(event.when);
                const isNotPast = eventDate.getTime() > new Date().getTime() - 24*60*60*1000;
                return <EventsListItem
                            key={event._id}
                            event={event}
                            isNotPast={isNotPast}
                            eventDate={eventDate}
                            toDelete={this.state.eventToDelete}
                            handleDeleteClick={this._showConfirmation}
                            handleCancelClick={this._hideConfirmation}
                            handleConfirmDeleteClick={this.props.onDeleteClick} />
              })
            }
          </tbody>
        </table>
        {
          (this.props.events.length === 0) &&
          <Alert
            type="info"
            message={<div>Aucun évènement. Tu peux en créer un en cliquant sur <b>créer un évènement</b></div>}
            />
        }
      </div>
    );
  }

}

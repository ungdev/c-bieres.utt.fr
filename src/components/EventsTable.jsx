import React from 'react'

import EventsTableRow from './EventsTableRow'
import Alert from './Alert'

const EventsTable = ({ events, deleteEvent }) => {
  if (events.length) {
    return (
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, i) => <EventsTableRow key={i} event={event} deleteEvent={deleteEvent} />)}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <Alert
      type="info"
      message={<div>Aucun évènement. Tu peux en créer un en cliquant sur <b>créer un évènement</b></div>}
      />
  )
}

export default EventsTable

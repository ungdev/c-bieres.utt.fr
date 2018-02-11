import React from 'react'

import EventsListItem   from './EventsListItem'
import Alert            from '../../pieces/Alert'

const EventsList = ({ events }) => {
  if (events.length) {
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
              events.map(event => {
                return <EventsListItem
                          key={event._id}
                          event={event}
                          eventDate={new Date(event.when)} />
              })
            }
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

export default EventsList

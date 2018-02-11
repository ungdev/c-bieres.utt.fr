import React from 'react';

import { Link } from 'react-router-dom';

const EventsListItem = ({ event, eventDate }) => (
  <tr>
    <td>{event.name}</td>
    <td>{`${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`}</td>
    <td>
      <div className="btn-group" role="group" aria-label="actions">
        <Link className="btn btn-primary"
              role="button"
              to={`/dashboard/event/${event._id}`}>
          Participants
        </Link>
        <Link className="btn btn-primary"
              role="button"
              to={`/dashboard/event/${event._id}/update`}>
          Modifier
        </Link>
      </div>
    </td>
  </tr>
)

export default EventsListItem

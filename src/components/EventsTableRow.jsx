import React from 'react'
import { Link } from 'react-router-dom'
import { toHumanDate } from '../helpers/dateHelper'

const EventsTableRow = ({ event, eventDate }) => (
  <tr>
    <td>{event.name}</td>
    <td>{toHumanDate(event.when)}</td>
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
          Informations
        </Link>
      </div>
    </td>
  </tr>
)

export default EventsTableRow

import React from 'react'
import { Link } from 'react-router-dom'
import { toHumanDate, isPast } from '../helpers/dateHelper'

const EventsTableRow = ({ event, eventDate, deleteEvent }) => (
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
        {!isPast(event.when) &&
          <button
            type="button"
            onClick={_ => deleteEvent(event._id)}
            className="btn btn-danger">
            Supprimer
          </button>}
      </div>
    </td>
  </tr>
)

export default EventsTableRow

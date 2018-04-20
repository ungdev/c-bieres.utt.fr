import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { toHumanDate } from '../helpers/dateHelper'

const OldEventsTableRow = ({ event }) => (
  <tr>
    <th scope="row">
      {event.name}
    </th>
    <td className="old-events__table__col">
      {toHumanDate(event.when)}
    </td>
    <td className="old-events__table__col">
      <Link className="btn btn-link" to={`/olds/${event._id}`}>Voir</Link>
    </td>
  </tr>
)

OldEventsTableRow.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
}

export default OldEventsTableRow

import React from 'react';
import PropTypes from 'prop-types'
import Button from './pieces/Button'
import { toHumanDate } from '../helpers/dateHelper'

const OldEventsRow = ({ event, eventDate, onClick }) => (
  <tr>
    <th scope="row">
      {event.name}
    </th>
    <td className="old-events__table__col">
      {toHumanDate(event.when)}
    </td>
    <td className="old-events__table__col">
      <Button theme="link" content="Voir" onClick={_ => onClick(event._id)} />
    </td>
  </tr>
)

OldEventsRow.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default OldEventsRow

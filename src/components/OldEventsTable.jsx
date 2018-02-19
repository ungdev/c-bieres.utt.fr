import React from 'react'

import OldEventsTableRow from './OldEventsTableRow'

const OldEventsTable = ({ events }) => (
  <table className="table table-hover table-striped old-events__table">
    <tbody>
      {events.map((event, i) => <OldEventsTableRow key={i} event={event} />)}
    </tbody>
  </table>
)

export default OldEventsTable

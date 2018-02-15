import React from 'react'
import Beer from './home/Beer'
import { toHumanDate } from '../helpers/dateHelper'

const OldEvent = ({ event, goHome, goOldEvents, fetchEvents }) => {
  if (!event) {
      return null;
  }

  return (
    <div>
      <div className="old-event__header">
        <hr className="my-4 old-event__header__seperator" />
        <div className="container old-event__header__inner">
          <h2 className="display-4">{event.name}</h2>
          <p>Le <b>{toHumanDate(event.when)}</b></p>
          <button className="btn btn-light old-event__header__inner__button--right" onClick={goOldEvents}>
            Retour à la liste
          </button>
        </div>
      </div>
      <div className="container old-event__beers">
        {event.beers.map((beer, i) => <Beer key={i} beer={beer} left={i%2 === 0} />)}
      </div>
    </div>
  )
}

export default OldEvent

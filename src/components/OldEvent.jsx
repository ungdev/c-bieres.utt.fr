import React from 'react'
import Beer from './home/Beer'

const OldEvent = ({ event, goHome, goOldEvents, fetchEvents }) => {
  if (!event) {
      return null;
  }

  const eventDate = new Date(event.when);
  const humanDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;

  return (
    <div>
      <div className="old-event__header">
        <hr className="my-4 old-event__header__seperator" />
        <div className="container old-event__header__inner">
          <h2 className="display-4">{event.name}</h2>
          <p>Le <b>{humanDate}</b></p>
          <button className="btn btn-light old-event__header__inner__button--right"
                onClick={goOldEvents}>
            Retour à la liste
          </button>
        </div>
      </div>
      <div className="container old-event__beers">
        {
          event.beers.map((beer, i) => <Beer
                                          key={i}
                                          beer={beer}
                                          left={i%2 === 0} />)
        }
      </div>
    </div>
  )
}

export default OldEvent

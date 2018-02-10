import React from 'react';

import { Link } from 'react-router-dom';

const EventsListItem = ({ event, isNotPast, eventDate, toDelete, handleDeleteClick, handleCancelClick, handleConfirmDeleteClick }) => (
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
          Informations
        </Link>
        {
          isNotPast && (
            toDelete == event
            ?
              <div className="btn-group">
                <button type="button"
                      className="btn btn-success"
                      onClick={_ => handleConfirmDeleteClick(event._id)}>
                  <i className="fa fa-check"></i>
                </button>
                <button type="button"
                      className="btn btn-danger"
                      onClick={handleCancelClick}>
                  <i className="fa fa-close"></i>
                </button>
              </div>
            :
              <button type="button"
                    onClick={_ => handleDeleteClick(event)}
                    className="btn btn-danger">
                Supprimer
              </button>
          )
        }
      </div>
    </td>
  </tr>
)

export default EventsListItem

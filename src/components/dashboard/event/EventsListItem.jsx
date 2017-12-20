import React from 'react';

import { Link } from 'react-router-dom';

export default class EventsListItem extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const event = this.props.event;
        let eventDate = new Date(event.when);
        const isNotPast = eventDate.getTime() > new Date().getTime() - 24*60*60*1000;

        return (
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
                                this.props.toDelete == event
                                ?
                                    <div className="btn-group">
                                        <button type="button"
                                                className="btn btn-success"
                                                onClick={_ => this.props.handleConfirmDeleteClick(event._id)}>
                                            <i className="fa fa-check"></i>
                                        </button>
                                        <button type="button"
                                                className="btn btn-danger"
                                                onClick={this.props.handleCancelClick}>
                                            <i className="fa fa-close"></i>
                                        </button>
                                    </div>
                                :
                                    <button type="button"
                                            onClick={_ => this.props.handleDeleteClick(event)}
                                            className="btn btn-danger">
                                        Supprimer
                                    </button>
                            )
                        }
                    </div>
                </td>
            </tr>
        );
    }

}

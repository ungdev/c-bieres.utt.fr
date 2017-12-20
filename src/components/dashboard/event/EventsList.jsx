import React from 'react';

import { Link } from 'react-router-dom';

import Alert from '../../pieces/Alert';

import EventActions from '../../../actions/EventActions';

export default class EventsList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventToDelete: null
        };

        this._showConfirmation = this._showConfirmation.bind(this);
        this._hideConfirmation = this._hideConfirmation.bind(this);
        this._deleteEvent = this._deleteEvent.bind(this);
    }

    _showConfirmation(eventToDelete) {
        this.setState({ eventToDelete });
    }

    _hideConfirmation() {
        this.setState({ eventToDelete: null });
    }

    _deleteEvent(id) {
        EventActions.deleteEvent(id)
    }

    render() {
        return (
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.events.map(event => {
                                let eventDate = new Date(event.when);
                                const isNotPast = eventDate.getTime() > new Date().getTime() - 24*60*60*1000;
                                return  <tr key={event._id}>
                                            <td>{event.name}</td>
                                            <td>{`${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`}</td>
                                            <td>
                                                <div className="btn-group" role="group" aria-label="actions">
                                                    <Link className="btn btn-primary" role="button" to={`/dashboard/event/${event._id}`}>Participants</Link>
                                                    <Link className="btn btn-primary" role="button" to={`/dashboard/event/${event._id}/update`}>Informations</Link>
                                                    {
                                                        isNotPast && (
                                                            this.state.eventToDelete == event
                                                            ?
                                                                <div className="btn-group">
                                                                    <button type="button"
                                                                            className="btn btn-success"
                                                                            onClick={_ => this._deleteEvent(event._id)}>
                                                                        <i className="fa fa-check"></i>
                                                                    </button>
                                                                    <button type="button"
                                                                            className="btn btn-danger"
                                                                            onClick={this._hideConfirmation}>
                                                                        <i className="fa fa-close"></i>
                                                                    </button>
                                                                </div>
                                                            :
                                                                <button type="button"
                                                                        onClick={_ => this._showConfirmation(event)}
                                                                        className="btn btn-danger">
                                                                    Supprimer
                                                                </button>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                            })
                        }
                    </tbody>
                </table>

                {
                    (this.props.events.length === 0) &&
                    <Alert
                        type="info"
                        message={<div>Aucun évènement. Tu peux en créer un en cliquant sur <b>créer un évènement</b></div>}
                        />
                }

            </div>
        );
    }

}

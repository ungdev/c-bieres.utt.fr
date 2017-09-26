import React from 'react';
import { Link } from 'react-router-dom';

import DeleteEventConfirm from './DeleteEventConfirm.jsx';

import EventActions from '../../../actions/EventActions';
import EventStore from '../../../stores/EventStore';

export default class Event extends React.Component {

    constructor() {
        super();

        this.state = {
            showCreateForm: false,
            eventToDelete: null,
            name: "",
            date: "",
            events: []
        };

        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._submitCreateForm = this._submitCreateForm.bind(this);
        this._showConfirmation = this._showConfirmation.bind(this);
        this._hideConfirmation = this._hideConfirmation.bind(this);
        this._deleteEvent = this._deleteEvent.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange.bind(this));
        // trigger action for the store to load events
        EventActions.getEvents({ sort: '-when' });
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        this.setState({
            events: EventStore.events.sort((a, b) => a.when < b.when),
            showCreateForm: false,
            eventToDelete: null
        });
    }

    _toggleCreateForm() {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    _submitCreateForm() {
        EventActions.createEvent({
            name: this.state.name,
            when: this.state.date
        });
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

    _handleNameChange(event) {
        this.setState({ name: event.target.value });
    }

    _handleDateChange(event) {
        this.setState({ date: event.target.value });
    }

    render() {
        return (
            <div>
                <h1>Evènements</h1>
                <div>
                    <button type="button" onClick={this._toggleCreateForm} className="btn btn-primary btn-lg btn-block">
                        Créer un évènement
                    </button>
                    {
                        this.state.showCreateForm
                        ?
                            <div className="custom-form-container">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="name">Nom</label>
                                        <input type="text" onChange={this._handleNameChange} className="form-control" id="name" />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="date">Date</label>
                                        <input type="date" onChange={this._handleDateChange} className="form-control" id="date" />
                                    </div>
                                    <button type="button" onClick={this._submitCreateForm} className="btn btn-success btn-lg">Créer</button>
                                </form>
                            </div>
                        :
                            null
                    }
                </div>
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
                                this.state.events.map(event => {
                                    let eventDate = new Date(event.when);
                                    return  <tr key={event._id}>
                                                <td>{event.name}</td>
                                                <td>{`${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="actions">
                                                        <Link className="btn btn-primary" role="button" to={`/dashboard/event/${event._id}`}>Participants</Link>
                                                        <Link className="btn btn-primary" role="button" to={`/dashboard/event/${event._id}/update`}>Informations</Link>
                                                        {
                                                            (eventDate.getTime() > new Date().getTime()) &&
                                                            <button type="button" onClick={_ => this._showConfirmation(event)} className="btn btn-danger">
                                                                Supprimer
                                                            </button>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>

                    {
                        this.state.eventToDelete &&
                        <DeleteEventConfirm
                            event={this.state.eventToDelete}
                            close={this._hideConfirmation}
                            delete={this._deleteEvent}
                            />
                    }
                </div>
            </div>
        );
    }

}

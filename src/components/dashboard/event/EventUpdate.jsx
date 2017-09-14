import React from 'react';

import EventActions from '../../../actions/EventActions';
import EventStore from '../../../stores/EventStore';

export default class EventUpdate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            event: {}
        };

        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._submitUpdateForm = this._submitUpdateForm.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange.bind(this));
        // trigger action for the store to load the event
        EventActions.getEvent(this.state.id);
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        this.setState({ event: EventStore.getById(this.state.id) });
    }

    _handleNameChange(e) {
        let event = this.state.event;
        event.name = e.target.value;
        this.setState({ event });
    }

    _handleDateChange(e) {
        let event = this.state.event;
        event.when = e.target.value;
        this.setState({ event });
    }

    _submitUpdateForm() {
        EventActions.updateEvent(this.state.id, this.state.event);
    }

    render() {
        return (
            <div>
                <h1>Modification de <b>{this.state.event.name}</b></h1>
                <div className="custom-form-container">
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input type="text" onChange={this._handleNameChange} value={this.state.event.name} className="form-control" id="name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" onChange={this._handleDateChange} value={this.state.event.when && this.state.event.when.split('T')[0]} className="form-control" id="date" />
                        </div>
                        <button type="submit" onClick={this._submitUpdateForm} className="btn btn-success btn-lg">Mettre à jour</button>
                    </form>
                </div>
            </div>
        )
    }

}

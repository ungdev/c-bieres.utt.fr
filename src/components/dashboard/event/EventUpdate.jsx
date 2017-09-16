import React from 'react';

import EventActions from '../../../actions/EventActions';
import EventStore from '../../../stores/EventStore';

import AddBeer from './AddBeer.jsx';
import ShowBeer from './ShowBeer.jsx';

export default class EventUpdate extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            event: {},
            showBeerForm: false
        };

        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._submitUpdateForm = this._submitUpdateForm.bind(this);
        this._toggleBeerForm = this._toggleBeerForm.bind(this);
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

    _toggleBeerForm() {
        this.setState({ showBeerForm: !this.state.showBeerForm });
    }

    _submitUpdateForm() {
        EventActions.updateEvent(this.state.id, this.state.event);
    }

    render() {
        return (
            <div>
                <h1>Modification de <b>{this.state.event.name}</b></h1>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="name">Nom</label>
                            <input type="text" onChange={this._handleNameChange} value={this.state.event.name} className="form-control" id="name" />
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="date">Date</label>
                            <input type="date" onChange={this._handleDateChange} value={this.state.event.when && this.state.event.when.split('T')[0]} className="form-control" id="date" />
                        </div>
                        <div className="col-sm-4">
                            <button type="submit" onClick={this._submitUpdateForm} className="btn btn-success btn-lg">Mettre à jour</button>
                        </div>
                    </div>
                </form>
                <div>
                    {
                        this.state.event.beers && this.state.event.beers.map(beer => <ShowBeer beer={beer} />)
                    }
                    {
                        this.state.showBeerForm
                        ?
                            <AddBeer close={this._toggleBeerForm} />
                        :
                            <button type="button" onClick={this._toggleBeerForm} className="btn btn-link">Ajouter une bière</button>
                    }
                </div>
            </div>
        )
    }

}

import React from 'react';

import EventActions from '../../../actions/EventActions';
import BeerActions from '../../../actions/BeerActions';
import EventStore from '../../../stores/EventStore';

import AddBeer from './AddBeer.jsx';
import ShowBeer from './ShowBeer.jsx';
import UpdateBeer from './UpdateBeer.jsx';

export default class UpdateEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            originalDate: null,
            event: {},
            showBeerForm: false,
            beerToUpdate: null
        };

        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._submitUpdateForm = this._submitUpdateForm.bind(this);
        this._toggleBeerForm = this._toggleBeerForm.bind(this);

        this._updateBeer = this._updateBeer.bind(this);
        this._deleteBeer = this._deleteBeer.bind(this);
        this._showUpdateBeerForm = this._showUpdateBeerForm.bind(this);
        this._closeUpdateBeerForm = this._closeUpdateBeerForm.bind(this);
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

    _showUpdateBeerForm(beer) {
        this.setState({ beerToUpdate: beer._id });
    }

    _closeUpdateBeerForm(beer) {
        this.setState({ beerToUpdate: null });
    }

    _updateBeer(beer) {
        // Create a new FormData object and fill it with the beer values
        var form = new FormData();
        Object.keys(beer).map(attr => {
            form.append(attr, beer[attr]);
        });
        BeerActions.updateBeer(beer._id, form);
    }

    _deleteBeer(beer) {
        BeerActions.deleteBeer(beer);
    }

    _onEventStoreChange() {
        const event = EventStore.getById(this.state.id);
        this.setState({
            event,
            showBeerForm: false,
            beerToUpdate: null,
            originalDate: event.when
        });
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
        const isPast = new Date(this.state.originalDate).getTime() < new Date().getTime();

        return (
            <div>
                <h1>Modification de <b>{this.state.event.name}</b></h1>

                <h2>Informations globales</h2>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-sm-4">
                            <label htmlFor="name">Nom</label>
                            <input type="text" readOnly={isPast} onChange={this._handleNameChange} value={this.state.event.name} className="form-control" id="name" />
                        </div>
                        <div className="col-sm-4">
                            <label htmlFor="date">Date</label>
                            <input type="date" readOnly={isPast} onChange={this._handleDateChange} value={this.state.event.when && this.state.event.when.split('T')[0]} className="form-control" id="date" />
                        </div>
                        <div className="col-sm-4">
                            {
                                !isPast &&
                                <button type="button" onClick={this._submitUpdateForm} className="btn btn-success btn-lg">Mettre à jour</button>
                            }
                        </div>
                    </div>
                </form>

                <h2>Les bières</h2>
                <div>
                    {
                        this.state.event.beers && this.state.event.beers.map(beer => {
                            if (this.state.beerToUpdate === beer._id) {
                                return <UpdateBeer key={beer._id} update={this._updateBeer} close={this._closeUpdateBeerForm} beer={beer} />
                            } else {
                                return <ShowBeer key={beer._id} showActions={!isPast} beer={beer} update={this._showUpdateBeerForm} delete={this._deleteBeer} />
                            }

                        })
                    }
                    {
                        !isPast && (
                            this.state.showBeerForm
                            ?
                                <AddBeer eventId={this.state.id} close={this._toggleBeerForm} />
                            :
                                <button type="button" onClick={this._toggleBeerForm} className="btn btn-link">Ajouter une bière</button>
                        )
                    }
                </div>
            </div>
        )
    }

}

import React from 'react';

import CreateDrinker from './CreateDrinker.jsx';

import DrinkerActions from '../../../actions/DrinkerActions';
import EventActions from '../../../actions/EventActions';
import DrinkerStore from '../../../stores/DrinkerStore';

export default class AddDrinker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchPattern: "",
            matches: [],
            showCreateForm: false
        };

        this._handleSearchChange = this._handleSearchChange.bind(this);
        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._submitCreateForm = this._submitCreateForm.bind(this);
    }

    componentDidMount() {
        // listen the store change
        DrinkerStore.addChangeListener(this._onDrinkerStoreChange.bind(this));
    }

    componentWillUnmount() {
        DrinkerStore.removeChangeListener(this._onDrinkerStoreChange);
    }

    _onDrinkerStoreChange() {
        this.setState({ matches: DrinkerStore.drinkers });
    }

    _addDrinker(id) {
        EventActions.registerById(id);
    }

    _toggleCreateForm() {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    _submitCreateForm(data) {
        DrinkerActions.createDrinker(data);
    }

    _handleSearchChange(e) {
        this.setState({ searchPattern: e.target.value });
        if (e.target.value.length > 2) {
            // refresh the matches
            DrinkerActions.getDrinkers({
                multifield: e.target.value,
                nextEvent: true 
            });
        } else {
            this.setState({ matches: [] });
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#addDrinker">
                    Ajouter un participant
                </button>

                <div className="modal fade" tabIndex="-1" role="dialog" id="addDrinker">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajout d'un participant</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" placeholder="Rechercher" value={this.state.searchPattern} onChange={this._handleSearchChange} className="form-control" />
                                        <small className="form-text text-muted">Par nom, prénom, surnom, .. (3 caractères min)</small>
                                    </div>
                                </form>
                            </div>
                            <ul className="list-group">
                                {
                                    this.state.matches.map(match => {
                                        return  <li className="list-group-item">
                                                    {match.firstName} {match.lastName}
                                                    <button type="button" onClick={_ => this._addDrinker(match._id)} className="btn btn-add-drinker btn-secondary">Ajouter</button>
                                                </li>
                                    })
                                }
                            </ul>
                            <div className="container">
                                {
                                    this.state.showCreateForm
                                    ?
                                        <CreateDrinker submit={this._submitCreateForm} close={this._toggleCreateForm} />
                                    :
                                        <button type="button" onClick={this._toggleCreateForm} className="btn btn-link">
                                            Pas trouvé ? créer et ajouter à l'évènement
                                        </button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

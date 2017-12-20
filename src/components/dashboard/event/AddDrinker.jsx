import React from 'react';

import CreateDrinker    from './CreateDrinker';
import MatchesList      from '../../pieces/MatchesList';

import DrinkerActions   from '../../../actions/DrinkerActions';
import EventActions     from '../../../actions/EventActions';

import DrinkerStore     from '../../../stores/DrinkerStore';

export default class AddDrinker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchPattern: "",
            serverMatches: [],
            etuuttMatches: [],
            showForm: false
        };

        this._handleSearchChange = this._handleSearchChange.bind(this);
        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._submitCreateForm = this._submitCreateForm.bind(this);
        this._onDrinkerStoreChange = this._onDrinkerStoreChange.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
    }

    componentDidMount() {
        // listen the store change
        DrinkerStore.addChangeListener(this._onDrinkerStoreChange);
    }

    componentWillUnmount() {
        DrinkerStore.removeChangeListener(this._onDrinkerStoreChange);
    }

    _onDrinkerStoreChange() {
        this.setState({
            serverMatches: DrinkerStore.serverDrinkers,
            etuuttMatches: DrinkerStore.etuuttDrinkers,
        });
    }

    _toggleForm() {
        this.setState({ showForm: !this.state.showForm })
    }

    _addDrinker(drinker) {
        EventActions.registerById({id: drinker._id, eventId: this.props.eventId});
    }

    _addDrinkerFromEtuutt(match) {
        match.eventId = this.props.eventId;
        DrinkerActions.createDrinker(match);
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
                event: this.props.eventId
            });
        } else {
            this.setState({ serverMatches: [], etuuttMatches: [] });
        }
    }

    render() {

        if (!this.state.showForm) {
            return (
                <div>
                    <button className="btn btn-primary btn-lg btn-block"
                            onClick={this._toggleForm}>
                        Ajouter un participant
                    </button>
                </div>
            )
        }

        return (
            <div>
                <button className="btn btn-danger btn-lg btn-block"
                        onClick={this._toggleForm}>
                    Annuler
                </button>
                <form>
                    <br />
                    <div className="form-group">
                        <input  type="text"
                                placeholder="Rechercher"
                                value={this.state.searchPattern}
                                onChange={this._handleSearchChange}
                                className="form-control" />
                        <small className="form-text text-muted">
                            Par nom, prénom, surnom, .. (3 caractères min)
                        </small>
                    </div>
                </form>
                {
                    (this.state.serverMatches.length > 0) &&
                    <div className="container">
                        <h5>Déjà dans club bières</h5>
                        <MatchesList matches={this.state.serverMatches}
                                     onSelect={this._addDrinker} />
                    </div>
                }
                {
                    (this.state.etuuttMatches.length > 0) &&
                    <div className="container">
                        <h5>Depuis le site étu</h5>
                        <MatchesList matches={this.state.etuuttMatches}
                                     onSelect={this._addDrinkerFromEtuutt} />
                    </div>
                }
                <div className="container">
                    {
                        this.state.showCreateForm
                        ?
                            <CreateDrinker submit={this._submitCreateForm}
                                            close={this._toggleCreateForm} />
                        :
                            <button type="button"
                                    onClick={this._toggleCreateForm}
                                    className="btn btn-link">
                                Pas trouvé ? créer et ajouter à l'évènement
                            </button>
                    }
                </div>
            </div>
        );
    }
}

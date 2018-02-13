import React from 'react'
import { connect } from 'react-redux'

import CreateDrinker    from './CreateDrinker';
import SelectList       from '../../pieces/SelectList';

import { fetchDrinkers, createDrinker, registerById } from '../../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    etuuttDrinkers: state.drinkers.items.fromEtuutt,
    serverDrinkers: state.drinkers.items.fromServer,
    etuuttAreLoading: state.drinkers.etuuttItemsAreLoading,
    serverAreLoading: state.drinkers.serverItemsAreLoading,
    etuuttFetchHasFailed: state.drinkers.etuuttItemsHaveFailed,
    serverFetchHasFailed: state.drinkers.serverItemsHaveFailed,
    beingCreated: state.drinkers.itemBeingCreated,
    createHasFailed: state.drinkers.createHasFailed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchDrinkers: (fiters) => dispatch(fetchDrinkers(fiters)),
    createDrinker: (data) => dispatch(createDrinker(data)),
    registerById: (drinkerId, eventId) => dispatch(registerById(drinkerId, eventId))
  }
}

class AddDrinker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchPattern: "",
            showForm: false
        };

        this._handleSearchChange = this._handleSearchChange.bind(this);
        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._submitCreateForm = this._submitCreateForm.bind(this);
        this._toggleForm = this._toggleForm.bind(this);
        this._addDrinkerFromEtuutt = this._addDrinkerFromEtuutt.bind(this);
        this._addDrinker = this._addDrinker.bind(this);
    }

    _toggleForm() {
        this.setState({ showForm: !this.state.showForm })
    }

    _addDrinker(drinker) {
        this.props.registerById({id: drinker._id, eventId: this.props.eventId});
    }

    _addDrinkerFromEtuutt(match) {
        match.eventId = this.props.eventId;
        this.props.createDrinker(match)
    }

    _toggleCreateForm() {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    _submitCreateForm(data) {
        this.props.createDrinker(data)
    }

    _handleSearchChange(e) {
      this.setState({ searchPattern: e.target.value });
      if (e.target.value.length > 2) {
        // refresh the matches
        this.props.fetchDrinkers({
          multifield: e.target.value,
          event: this.props.eventId
        });
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
                    (this.props.serverDrinkers.length > 0) &&
                    <div className="container">
                        <h5>Déjà dans club bières</h5>
                        <SelectList items={this.props.serverDrinkers} onClick={this._addDrinker} />
                    </div>
                }
                {
                    (this.props.etuuttDrinkers.length > 0) &&
                    <div className="container">
                        <h5>Depuis le site étu</h5>
                        <SelectList items={this.props.etuuttDrinkers} onClick={this._addDrinkerFromEtuutt} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AddDrinker)

import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

import CreateDrinker from './CreateDrinker'
import SelectList from './SelectList'

const AddDrinker = createReactClass({
  getInitialState() {
    return {searchPattern: "", showForm: false}
  },
  toggleForm() {
    this.setState({ showForm: !this.state.showForm })
  },
  addDrinker(drinker) {
    this.props.registerById({ id: drinker._id, eventId: this.props.eventId })
  },
  addDrinkerFromEtuutt(match) {
    match.eventId = this.props.eventId;
    this.props.createDrinker(match)
  },
  addDrinkerFromEtuutt(match) {
    match.eventId = this.props.eventId;
    this.props.createDrinker(match)
  },
  toggleCreateForm() {
    this.setState({ showCreateForm: !this.state.showCreateForm });
  },
  submitCreateForm(data) {
    this.props.createDrinker(data)
  },
  handleSearchChange(e) {
    this.setState({ searchPattern: e.target.value });
    if (e.target.value.length > 2) {
      // refresh the matches
      this.props.fetchDrinkers({
        multifield: e.target.value,
        event: this.props.eventId
      });
    }
  },
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
        <button className="btn btn-danger btn-lg btn-block" onClick={this._toggleForm}>
          Annuler
        </button>
        <form>
          <br />
          <div className="form-group">
            <input type="text" placeholder="Rechercher" value={this.state.searchPattern}
              onChange={this._handleSearchChange} className="form-control" />
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
              <CreateDrinker submit={this._submitCreateForm} close={this._toggleCreateForm} />
            :
              <button type="button" onClick={this._toggleCreateForm} className="btn btn-link">
                Pas trouvé ? créer et ajouter à l'évènement
              </button>
          }
        </div>
      </div>
    )
  }
})

export default AddDrinker

import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'

import CreateDrinker from './CreateDrinker'
import SelectList from './SelectList'

const AddDrinker = createReactClass({
  getInitialState() {
    return {searchPattern: ""}
  },
  addDrinker(drinker) {
    this.props.registerById(drinker, this.props.event._id)
  },
  addDrinkerFromEtuutt(match) {
    match.eventId = this.props.this.props.event._id
    this.props.createDrinker(match)
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
        event: this.props.event._id
      })
    }
  },
  render() {
    if (!this.props.showRegistrationForm) {
      return (
        <div>
          <button className="btn btn-primary btn-lg btn-block"
              onClick={this.props.toggleRegistrationForm}>
            Ajouter un participant
          </button>
        </div>
      )
    }

    return (
      <div>
        <button className="btn btn-danger btn-lg btn-block" onClick={this.props.toggleRegistrationForm}>
          Annuler
        </button>
        <form>
          <br />
          <div className="form-group">
            <input type="text" placeholder="Rechercher" value={this.state.searchPattern}
              onChange={this.handleSearchChange} className="form-control" />
            <small className="form-text text-muted">
              Par nom, prénom, surnom, .. (3 caractères min)
            </small>
          </div>
        </form>
        {
          (this.props.serverDrinkers.length > 0) &&
          <div className="container">
            <h5>Déjà dans club bières</h5>
            <SelectList items={this.props.serverDrinkers} onClick={this.addDrinker} />
          </div>
        }
        {
          (this.props.etuuttDrinkers.length > 0) &&
          <div className="container">
            <h5>Depuis le site étu</h5>
            <SelectList items={this.props.etuuttDrinkers} onClick={this.addDrinkerFromEtuutt} />
          </div>
        }
        <div className="container">
          {
            this.props.showCreateForm
            ?
              <CreateDrinker submit={this.submitCreateForm} close={this.props.toggleCreateForm} />
            :
              <button type="button" onClick={this.props.toggleCreateForm} className="btn btn-link">
                Pas trouvé ? créer et ajouter à l'évènement
              </button>
          }
        </div>
      </div>
    )
  }
})

export default AddDrinker

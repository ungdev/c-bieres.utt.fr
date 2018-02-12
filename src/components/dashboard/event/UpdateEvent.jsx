import React from 'react'
import { connect } from 'react-redux'

import AddBeer      from './AddBeer';
import ShowBeer     from './ShowBeer';
import UpdateBeer   from './UpdateBeer';

import { updateEvent, deleteEvent, deleteBeer, createBeer, updateBeer } from '../../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0],
    beingUpdated: state.events.itemBeingUpdated,
    updateHasFailed: state.events.updateHasFailed,
    beingDeleted: state.events.itemBeingDeleted,
    deleteHasFailed: state.events.itemBeingDeleted
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateEvent: (event) => dispatch(updateEvent(event)),
    deleteEvent: () => dispatch(deleteEvent(ownProps.match.params.id)),
    deleteBeer: (beerId) => dispatch(deleteBeer(beerId, ownProps.match.params.id)),
    createBeer: (beer) => dispatch(createBeer(beer)),
    updateBeer: (beer) => dispatch(updateBeer(beer))
  }
}

class UpdateEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event,
            showBeerForm: false,
            beerToUpdate: null
        };

        this._handleNameChange = this._handleNameChange.bind(this);
        this._handleDateChange = this._handleDateChange.bind(this);
        this._toggleBeerForm = this._toggleBeerForm.bind(this);

        this._showUpdateBeerForm = this._showUpdateBeerForm.bind(this);
        this._closeUpdateBeerForm = this._closeUpdateBeerForm.bind(this);
    }

    _showUpdateBeerForm(beer) {
        this.setState({ beerToUpdate: beer._id });
    }

    _closeUpdateBeerForm(beer) {
        this.setState({ beerToUpdate: null });
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

  render() {
    const isPast = new Date(this.props.event.when).getTime() < (new Date().getTime() - 24*60*60*1000);

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3 text-center">{this.state.event.name}</h1>
          <hr className="my-4" />
          <h2 className="text-center">Informations principales</h2>
          <br />
          <form>
            <div className="container">
              <div className="row justify-content-md-center">
                <div className="col col-md-8">
                  <p className="lead">
                    <div className="form-group">
                      <label htmlFor="name">Nom</label>
                      <input type="text" readOnly={isPast} onChange={this._handleNameChange} value={this.state.event.name} className="form-control" id="name" />
                    </div>
                  </p>
                  <p className="lead">
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input type="date" min={new Date().toJSON().split('T')[0]} readOnly={isPast} onChange={this._handleDateChange} value={this.state.event.when && this.state.event.when.split('T')[0]} className="form-control" id="date" />
                    </div>
                  </p>
                  <p className="lead">
                    {
                      !isPast &&
                      <div>
                        <button
                          type="button"
                          onClick={_ => this.props.updateEvent(this.state.event)}
                          className="btn btn-success btn-lg btn-block">
                          Mettre à jour
                        </button>
                        <button
                          type="button"
                          onClick={this.props.deleteEvent}
                          className="btn btn-danger btn-lg btn-block">
                          Supprimer
                        </button>
                      </div>
                    }
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>

        <h2 className="text-center">Les bières</h2>
        <div>
          <div className="row justify-content-md-center">
            {
              !isPast && (
                this.state.showBeerForm
                ?
                  <AddBeer createBeer={this.props.createBeer} eventId={this.props.event._id} close={this._toggleBeerForm} />
                :
                  <div className="col col-md-4 add-beer-container">
                    <button
                      type="button"
                      onClick={this._toggleBeerForm}
                      className="btn btn-outline-primary btn-block">
                      Ajouter une bière
                    </button>
                  </div>
              )
            }
          </div>
          {
              this.state.event.beers.map((beer, i) => {
                  if (this.state.beerToUpdate === beer._id) {
                      return <UpdateBeer key={i} update={this.props.updateBeer} close={this._closeUpdateBeerForm} beer={beer} />
                  } else {
                      return <ShowBeer key={i} showActions={!isPast} beer={beer} update={this._showUpdateBeerForm} delete={this.props.deleteBeer} />
                  }

              })
          }
        </div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEvent)

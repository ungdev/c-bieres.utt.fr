import React from 'react'
import { connect } from 'react-redux'
import createReactClass from 'create-react-class'
import { isPast } from '../helpers/dateHelper'
import CreateBeer from './CreateBeer'
import DashboardBeer from './DashboardBeer'
import UpdateBeer from './UpdateBeer'

const UpdateEvent = createReactClass({
  getInitialState() {
    return {
      event: this.props.event,
      beerToUpdate: null,
      isPast: this.props.event && isPast(this.props.event.when)
    }
  },
  handleChange(e) {
    this.setState({
      event: Object.assign({}, this.state.event, {
        [e.target.name]: e.target.value
      })
    })
  },
  showUpdateBeerForm(beer) {
    this.setState({ beerToUpdate: beer._id })
  },
  closeUpdateBeerForm(beer) {
    this.setState({ beerToUpdate: null })
  },
  componentWillReceiveProps(nextProps) {
    this.setState({ event: nextProps.event })
  },
  render() {
    if (!this.state.event || !this.props.event) {
      return <div></div>
    }
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
                      <input type="text" readOnly={this.state.isPast} onChange={this.handleChange} value={this.state.event.name}
                        className="form-control" id="name" name="name" />
                    </div>
                  </p>
                  <p className="lead">
                    <div className="form-group">
                      <label htmlFor="when">Date</label>
                      <input type="date" min={new Date().toJSON().split('T')[0]} readOnly={this.state.isPast}
                        onChange={this.handleChange} value={this.state.event.when && this.state.event.when.split('T')[0]}
                        className="form-control" id="when" name="when" />
                    </div>
                  </p>
                  <p className="lead">
                    {
                      !this.state.isPast &&
                      <div>
                        <button
                          type="button"
                          onClick={_ => this.props.updateEvent(this.state.event)}
                          className="btn btn-success btn-lg btn-block">
                          Mettre à jour
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
              !this.state.isPast && (
                this.props.showCreateBeerForm
                ?
                  <CreateBeer createBeer={this.props.createBeer} eventId={this.props.event._id} close={this.props.toggleCreateBeerForm} />
                :
                  <div className="col col-md-4 add-beer-container">
                    <button onClick={this.props.toggleCreateBeerForm} type="button" className="btn btn-outline-primary btn-block">
                      Ajouter une bière
                    </button>
                  </div>
              )
            }
          </div>
          {
            this.state.event.beers.map((beer, i) => {
              if (this.state.beerToUpdate === beer._id) {
                return <UpdateBeer key={i} update={this.props.updateBeer} close={this.closeUpdateBeerForm}
                  beer={beer} />
              } else {
                return <DashboardBeer key={i} showActions={!this.state.isPast} beer={beer} updateBeer={this.showUpdateBeerForm}
                  deleteBeer={this.props.deleteBeer} />
              }
            })
          }
        </div>
      </div>
    )
  }
})

export default UpdateEvent

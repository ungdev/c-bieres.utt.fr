import React from 'react'
import createReactClass from 'create-react-class'
import AddDrinker from './AddDrinker'
import { toHumanDate, isPast } from '../helpers/dateHelper'

const Event = createReactClass({
  getInitialState() {
    return {filters: {}}
  },
  componentDidMount() {
    this.props.fetchEvents()
  },
  unregisterDrinker(id) {
    this.props.unregisterById({id, eventId: this.props.event._id})
  },
  setFilter(e) {
    this.setState({
      filters: Object.assign({}, this.state.filters, {
        [e.target.name]: e.target.value
      })
    })
  },
  clearFilters() {
    this.setState({ filters: {} })
  },
  render() {
    if (!this.props.event) {
      return (<div></div>)
    }

    return (
      <div>
        <div className="jumbotron">
          <h1 className="display-3 text-center">
            Participants
          </h1>
          <div className="text-center">
            à <b>{this.props.event.name}</b>, le <b>{toHumanDate(this.props.event.when)}</b>
          </div>
          <hr className="my-4" />
          <div className="row justify-content-md-center">
            <div className="col col-md-4">
              {(!isPast(this.props.event.when)) &&
                <AddDrinker eventId={this.props.event._id} serverDrinkers={this.props.serverDrinkers}
                  etuuttDrinkers={this.props.etuuttDrinkers} fetchDrinkers={this.props.fetchDrinkers}
                  createDrinker={this.props.createDrinker} registerById={this.props.registerById} />}
            </div>
          </div>
        </div>
        <div className="alert alert-primary" role="alert">
          <b>{this.props.event.drinkers.length}</b> participants
        </div>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Numéro étu</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input onChange={this.setFilter} name="studentId" value={this.state.filters.studentId || ""}
                    type="text" className="form-control" placeholder="filtrer num étu" />
                </td>
                <td>
                  <input onChange={this.setFilter} name="firstName" value={this.state.filters.firstName || ""}
                    type="text" className="form-control" placeholder="filtrer prénom" />
                </td>
                <td>
                  <input onChange={this.setFilter} name="lastName" value={this.state.filters.lastName || ""}
                    type="text" className="form-control" placeholder="filtrer nom" />
                </td>
                <td>
                  <button onClick={this.clearFilters} type="button" className="btn btn-primary">
                    Clear
                  </button>
                </td>
              </tr>
              {
                this.props.event.drinkers
                  .filter(drinker => {
                    for (let filter in this.state.filters) {
                      if (this.state.filters[filter] && !drinker[filter].startsWith(this.state.filters[filter])) {
                        return false
                      }
                    }
                    return true
                  })
                  .map((drinker, i) => {
                    return  <tr key={i}>
                              <td>{drinker.studentId}</td>
                              <td>{drinker.firstName}</td>
                              <td>{drinker.lastName}</td>
                              <td>
                                {
                                  !isPast(this.props.event.when) &&
                                  <button onClick={_ => this.unregisterDrinker(drinker._id)} type="button"
                                    className="btn btn-danger">
                                    Retirer
                                  </button>
                                }
                              </td>
                            </tr>
                  })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
})

export default Event

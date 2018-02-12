import React from 'react'
import { connect } from 'react-redux'

import AddDrinker from './AddDrinker';

import EventActions from '../../../actions/EventActions';

import { fetchEvents } from '../../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    event: state.events.items.filter(item => item._id == ownProps.match.params.id)[0],
    areLoading: state.events.itemsAreLoading,
    haveFailed: state.events.itemsHaveFailed,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  }
}

class ShowEvent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            event: null,
            drinkers: [],
            filters: {}
        };

        this._unregisterDrinker = this._unregisterDrinker.bind(this);
        this._setFilter = this._setFilter.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
    }

    componentDidMount() {
      this.props.fetchEvents()
    }

    _unregisterDrinker(id) {
        EventActions.unregisterById({id, eventId: this.state.id});
    }

    _setFilter(updatedFilter, e) {
        let nextState = this.state;
        nextState.filters[updatedFilter] = e.target.value;
        this.setState(nextState);
    }

    _clearFilters() {
        this.setState({ filters: {}, drinkers: this.props.event.drinkers });
    }

    render() {
        if (!this.props.event) {
            return (<div></div>);
        }

        let eventDate = new Date(this.props.event.when);
        let formattedDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;

        const isPast = eventDate.getTime() < (new Date().getTime() - 24*60*60*1000);
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3 text-center">
                        Participants
                    </h1>
                    <div className="text-center">
                        à <b>{this.props.event.name}</b>, le <b>{formattedDate}</b>
                    </div>
                    <hr className="my-4" />
                    <div className="row justify-content-md-center">
                        <div className="col col-md-4">
                            {
                                (!isPast) && <AddDrinker eventId={this.props.event._id} />
                            }
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
                                    <input
                                        onChange={e => this._setFilter('studentId', e)}
                                        value={this.state.filters.studentId || ""}
                                        type="text"
                                        className="form-control"
                                        placeholder="filtrer num étu"
                                        />
                                </td>
                                <td>
                                    <input
                                        onChange={e => this._setFilter('firstName', e)}
                                        value={this.state.filters.firstName || ""}
                                        type="text"
                                        className="form-control"
                                        placeholder="filtrer prénom"
                                        />
                                </td>
                                <td>
                                    <input
                                        onChange={e => this._setFilter('lastName', e)}
                                        value={this.state.filters.lastName || ""}
                                        type="text"
                                        className="form-control"
                                        placeholder="filtrer nom"
                                        />
                                </td>
                                <td>
                                    <button onClick={this._clearFilters} type="button" className="btn btn-primary">
                                        Clear
                                    </button>
                                </td>
                            </tr>
                            {
                              this.props.event.drinkers
                                .filter(drinker => {
                                    for (let filter of this.state.filters) {
                                        if (this.state.filters[filter] && !drinker[filter].startsWith(this.state.filters[filter])) {
                                            return false;
                                        }
                                    }
                                    return true;
                                })
                                .map((drinker, i) => {
                                  return  <tr key={i}>
                                              <td>{drinker.studentId}</td>
                                              <td>{drinker.firstName}</td>
                                              <td>{drinker.lastName}</td>
                                              <td>
                                                {
                                                  !isPast &&
                                                  <button onClick={_ => this._unregisterDrinker(drinker._id)} type="button" className="btn btn-danger">
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
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEvent)

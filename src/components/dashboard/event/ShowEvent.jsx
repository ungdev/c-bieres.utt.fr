import React from 'react';

import AddDrinker from './AddDrinker';

import EventActions from '../../../actions/EventActions';

import EventStore   from '../../../stores/EventStore';

export default class ShowEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            event: null,
            drinkers: [],
            filters: {}
        };

        this._unregisterDrinker = this._unregisterDrinker.bind(this);
        this._onEventStoreChange = this._onEventStoreChange.bind(this);
        this._setFilter = this._setFilter.bind(this);
        this._clearFilters = this._clearFilters.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange);
        // trigger action for the store to load the event
        EventActions.getEvent(this.state.id);
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        let event = EventStore.getById(this.state.id);
        this.setState({ event, drinkers: event.drinkers.slice() });
    }

    _unregisterDrinker(id) {
        EventActions.unregisterById({id, eventId: this.state.id});
    }

    _setFilter(updatedFilter, e) {
        let nextState = this.state;
        nextState.filters[updatedFilter] = e.target.value;

        nextState.drinkers = nextState.event.drinkers.slice().filter(drinker => {
            for (let filter in nextState.filters) {
                if (nextState.filters[filter] && !drinker[filter].startsWith(nextState.filters[filter])) {
                    return false;
                }
            }
            return true;
        });

        this.setState(nextState);
    }

    _clearFilters() {
        this.setState({ filters: {}, drinkers: this.state.event.drinkers });
    }

    render() {
        if (!this.state.event) {
            return (<div></div>);
        }

        let eventDate = new Date(this.state.event.when);
        let formattedDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;

        const isPast = eventDate.getTime() < (new Date().getTime() - 24*60*60*1000);

        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3 text-center">
                        Participants
                    </h1>
                    <div className="participant-subtitle text-center">
                        à <b>{this.state.event.name}</b>, le <b>{formattedDate}</b>
                    </div>
                    <hr className="my-4" />
                    <div className="row justify-content-md-center">
                        <div className="col col-md-4">
                            {
                                (!isPast) && <AddDrinker eventId={this.state.id} />
                            }
                        </div>
                    </div>
                </div>
                <div className="alert alert-primary" role="alert">
                    <b>{this.state.event.drinkers.length}</b> participants
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
                                this.state.drinkers.map((drinker, i) => {
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

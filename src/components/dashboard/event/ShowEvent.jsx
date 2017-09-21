import React from 'react';

import EventActions from '../../../actions/EventActions';
import EventStore from '../../../stores/EventStore';

export default class ShowEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            id: props.match.params.id,
            event: null
        };

        this._unregisterDrinker = this._unregisterDrinker.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange.bind(this));
        // trigger action for the store to load the event
        EventActions.getEvent(this.state.id);
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        this.setState({ event: EventStore.getById(this.state.id) });
    }

    _unregisterDrinker(studentId) {
        EventActions.unregister({studentId});
    }

    render() {
        if (!this.state.event) {
            return (<div></div>);
        }

        let eventDate = new Date(this.state.event.when);
        let formattedDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;
        return (
            <div>
                <h1>
                    Participants à <b>{this.state.event.name}</b> le <b>{formattedDate}</b>
                </h1>
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
                            {
                                this.state.event.drinkers.map(drinker => {
                                    return  <tr key={drinker.studentId}>
                                                <td>{drinker.studentId}</td>
                                                <td>{drinker.firstName}</td>
                                                <td>{drinker.lastName}</td>
                                                <td>
                                                    <button onClick={_ => this._unregisterDrinker(drinker.studentId)} type="button" className="btn btn-danger">
                                                        Retirer
                                                    </button>
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

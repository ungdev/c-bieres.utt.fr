import React from 'react';

import OldEventsListItem from './OldEventsListItem';

import EventActions from '../../actions/EventActions';

import EventStore from '../../stores/EventStore';

export default class OldEventsList extends React.Component {

    constructor() {
        super();

        this.state = {
            events: []
        }

        this._onEventStoreChange = this._onEventStoreChange.bind(this);
        this._showOldEvent = this._showOldEvent.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange);
        // trigger action for the store to load events
        EventActions.getEvents({ before: new Date(), sort: '-when' });
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        // get only the past events !
        const now = new Date();
        this.setState({
            events: EventStore.events
                        .filter(e => new Date(e.when) < now)
                        .sort((a, b) => a.when < b.when)
        });
    }

    _showOldEvent(id) {
        this.props.history.push(`/olds/${id}`);
    }

    render() {
        return (
            <div className="container">
                <table className="table table-hover table-striped old-events-table">
                    <tbody>
                        {this.state.events.map(event => <OldEventsListItem
                                                            key={event._id}
                                                            event={event}
                                                            handleClick={this._showOldEvent} />)}
                    </tbody>
                </table>
            </div>
        );
    }

}

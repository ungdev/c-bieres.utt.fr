import React from 'react';

import CreateEvent          from './CreateEvent';
import EventsList           from './EventsList';
import Alert                from '../../pieces/Alert';

import EventActions from '../../../actions/EventActions';

import EventStore   from '../../../stores/EventStore';

export default class Event extends React.Component {

    constructor() {
        super();

        this.state = {
            showCreateForm: false,
            events: []
        };

        this._toggleCreateForm = this._toggleCreateForm.bind(this);
        this._onEventStoreChange = this._onEventStoreChange.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange);
        // trigger action for the store to load events
        EventActions.getEvents({ sort: '-when' });
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        this.setState({
            events: EventStore.events.sort((a, b) => a.when < b.when),
            showCreateForm: false
        });
    }

    _toggleCreateForm() {
        this.setState({ showCreateForm: !this.state.showCreateForm });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3 text-center">Evènements</h1>
                    <hr className="my-4" />
                    <div className="row justify-content-md-center">
                        <div className="col col-md-4">
                            <CreateEvent
                                showForm={this.state.showCreateForm}
                                toggle={this._toggleCreateForm} />
                        </div>
                    </div>
                </div>

                <EventsList events={this.state.events} />
            </div>
        );
    }

}

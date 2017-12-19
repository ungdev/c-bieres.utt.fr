import React from 'react';

import EventActions from '../../actions/EventActions';
import EventStore from '../../stores/EventStore';

import Beer from '../home/Beer.jsx';

export default class OldEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventId: props.match.params.id,
            event: null
        }

        this._onEventStoreChange = this._onEventStoreChange.bind(this);
        this._handleClick = this._handleClick.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EventStore.addChangeListener(this._onEventStoreChange);
        // trigger action for the store to load the event
        EventActions.getEvent(this.state.eventId);
    }

    componentWillUnmount() {
        EventStore.removeChangeListener(this._onEventStoreChange);
    }

    _onEventStoreChange() {
        let event = EventStore.getById(this.state.eventId);
        this.setState({ event, drinkers: event.drinkers.slice() });
    }

    _handleClick() {
        this.props.history.push('/olds');
    }

    render() {
        const event = this.state.event;

        if (!event) {
            return null;
        }

        const eventDate = new Date(event.when);
        const humanDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;

        return (
            <div>
                <div className="old-event-header">
                    <hr className="my-4" />
                    <div className="container">
                        <h2 className="display-4">{event.name}</h2>
                        <p>Le <b>{humanDate}</b></p>
                        <button className="btn btn-light" onClick={this._handleClick}>
                            Retour à la liste
                        </button>
                    </div>
                </div>
                <div className="container old-event-beers">
                    {
                        event.beers.map((beer, i) => <Beer
                                                        key={i}
                                                        beer={beer}
                                                        left={i%2 === 0} />)
                    }
                </div>
            </div>
        );
    }

}

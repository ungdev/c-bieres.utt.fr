import React from 'react';

export default class OldEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            eventId: props.match.params.id
        }
    }

    render() {
        return (
            <div>
                event {this.state.eventId}
            </div>
        );
    }

}

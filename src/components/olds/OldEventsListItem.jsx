import React from 'react';

export default class OldEventsListItem extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: this.props.event
        };
    }

    render() {
        const event = this.state.event;
        const eventDate = new Date(event.when);

        return (
            <tr>
                <th scope="row">
                    {event.name}
                </th>
                <td className="old-events__table__col">
                    {`${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`}
                </td>
                <td className="old-events__table__col">
                    <button type="button"
                            className="btn btn-link"
                            onClick={_ => this.props.handleClick(event._id)}>
                        Voir
                    </button>
                </td>
            </tr>
        );
    }

}
import React from 'react';

export default class MatchesList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="matches-list">
                <ul className="list-group matches-list">
                    {
                        this.props.matches.map((match, i) => {
                            return  <li key={i} className="list-group-item">
                                        {match.firstName} {match.lastName}
                                        <button type="button"
                                                onClick={_ => this.props.onSelect(match)}
                                                className="btn btn-success">
                                            Ajouter
                                        </button>
                                    </li>
                        })
                    }
                </ul>
            </div>
        );
    }

}

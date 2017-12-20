import React from 'react';

export default class ShowOldEvents extends React.Component {

    constructor(props) {
        super(props);

        this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
        this.props.history.push("/olds");
    }

    render() {
        return (
            <div className="show-old-events-container">
                <div className="container text-center">
                    <p>
                        <img className="img-fluid" src="images/meme.jpg" />
                    </p>
                    <p className="lead old-event-description">
                        Tu peux trouver les bières que tu as rencontré aux précédents club bières en
                        consultant les anciens évènements.
                    </p>
                    <button type="button" onClick={this._handleClick} className="btn btn-lg btn-primary">
                        Voir les anciens évènements
                    </button>
                </div>
            </div>
        )
    }

}

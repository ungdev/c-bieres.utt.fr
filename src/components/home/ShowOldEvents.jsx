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
                    <p className="lead">
                        Comment elle s'appelle la petite blonde de la dernière fois déjà ? (la bière hein ...)
                    </p>
                    <p>
                        Tu peux trouver les bières que tu as rencontré aux précédents club bières en cliquant sur
                        consultant les anciens évènements.
                    </p>
                    <button type="button" onClick={this._handleClick} className="btn btn-primary">
                        Voir les anciens évènements
                    </button>
                </div>
            </div>
        )
    }

}

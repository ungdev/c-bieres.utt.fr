import React from 'react';

export default class ShowBeer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: props.beer
        }
    }

    render() {
        return (
            <div className="card w-100">
                <div className="card-body">
                    <h4 className="card-title">{this.state.beer.name}</h4>
                    <p className="card-text">{this.state.beer.type}</p>
                    <p className="card-text">{this.state.beer.description}</p>
                    <div className="btn-group" role="group">
                        <button type="button" onClick={_ => this.props.update(this.state.beer)} className="btn btn-primary">Modifier</button>
                        <button type="button" onClick={_ => this.props.delete(this.state.beer)} className="btn btn-danger">Supprimer</button>
                    </div>
                </div>
            </div>
        );
    }

}

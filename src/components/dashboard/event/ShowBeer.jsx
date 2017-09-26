import React from 'react';

export default class ShowBeer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: props.beer,
            showActions: props.showActions
        };
    }

    render() {
        return (
            <div className="showbeer-container row">
                <div className="col-3">
                    <img src={process.env.SERVER_URI + this.state.beer.image} />
                </div>
                <div className="col-9">
                    <h4>{this.state.beer.name}</h4>
                    <span className="badge badge-primary">{this.state.beer.type}</span>
                    <p>{this.state.beer.description}</p>
                    {
                        this.state.showActions &&
                        <div className="btn-group" role="group">
                            <button type="button" onClick={_ => this.props.update(this.state.beer)} className="btn btn-primary">Modifier</button>
                            <button type="button" onClick={_ => this.props.delete(this.state.beer)} className="btn btn-danger">Supprimer</button>
                        </div>
                    }
                </div>
            </div>
        );
    }

}

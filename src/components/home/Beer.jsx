import React from 'react';

export default class Beer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: props.beer,
            left: props.left
        };
    }

    render() {
        return (
            <div className="side-image">
                {this.state.left &&<div className="images-wrapper"></div>}
                <div className="side-image-content">
                    <h4>{this.state.beer.type}</h4>
                    <h1>{this.state.beer.name}</h1>
                    <p>{this.state.beer.description}</p>
                </div>
                {!this.state.left &&<div className="images-wrapper"></div>}
            </div>
        )
    }

}

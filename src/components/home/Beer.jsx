import React from 'react';

import ImageWrapper from './ImageWrapper.jsx';

export default class Beer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            beer: props.beer,
            left: props.left,
            diplayColumn: props.diplayColumn
        };
    }

    render() {
        return (
            <div className="side-image">
                {!this.state.diplayColumn && this.state.left && <ImageWrapper path={this.state.beer.image} />}
                <div className="side-image-content">
                    <span className="badge badge-primary">{this.state.beer.type}</span>
                    {
                      this.state.beer.degree &&
                      <span className="badge badge-warning">{this.state.beer.degree} %</span>
                    }
                    <h2>{this.state.beer.name}</h2>
                    <p>{this.state.beer.description}</p>
                </div>
                {(this.state.diplayColumn || !this.state.left) && <ImageWrapper path={this.state.beer.image} />}
            </div>
        )
    }

}

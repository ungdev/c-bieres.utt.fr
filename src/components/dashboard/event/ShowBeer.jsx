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
            <div>
                <p>{this.state.beer.name}</p>
                <p>{this.state.beer.type}</p>
                <p>{this.state.beer.description}</p>
            </div>
        );
    }

}

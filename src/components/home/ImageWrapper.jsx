import React from 'react';

export default class ImageWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uri: process.env.SERVER_URI + props.path
        }
    }

    render() {
        return (
            <div className="images-wrapper" style={{backgroundImage: `url(${this.state.uri})`}}></div>
        );
    }

}

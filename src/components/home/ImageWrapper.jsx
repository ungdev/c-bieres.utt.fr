import React from 'react';

export default class ImageWrapper extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uri: process.env.SERVER_URI + props.path
        }
    }

    render() {
        const style = {backgroundImage: `url(${this.props.path ? this.state.uri : 'assets/images/beer.png'})`};
        return (
            <div className="images-wrapper" style={style}></div>
        );
    }

}

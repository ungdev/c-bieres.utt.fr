import React from 'react';

export default class Alert extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="alert-message-container">
                <div className={`alert alert-${this.props.type}`} role="alert">
                    {this.props.message}
                </div>
            </div>
        );
    }

}

import React from 'react';

export default class Alert extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`alert-container alert alert-${this.props.alert.type} alert-dismissible fade show`} role="alert">
                <button onClick={_ => this.props.close(this.props.alert.id)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.alert.message}
            </div>
        );
    }

}

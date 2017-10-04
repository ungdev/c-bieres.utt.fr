import React from 'react';

export default class Toast extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`toast-container alert alert-${this.props.toast.type} alert-dismissible fade show`} role="alert">
                <button onClick={_ => this.props.close(this.props.toast.id)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.toast.message}
            </div>
        );
    }

}

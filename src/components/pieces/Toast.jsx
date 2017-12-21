import React from 'react';

const TOAST_DURATION = 3000;

export default class Toast extends React.Component {

    constructor(props) {
        super(props);

        this.interval = null;
    }

    componentDidMount() {
        this.interval = setTimeout(_ => {
            this.props.close(this.props.toast.id);
        }, TOAST_DURATION, this);
    }

    componentWillUnmount() {
        clearTimeout(this.interval);
    }

    render() {
        return (
            <div className={`toast alert alert-${this.props.toast.type} alert-dismissible fade show`} role="alert">
                <button onClick={_ => this.props.close(this.props.toast.id)} type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                {this.props.toast.message}
            </div>
        );
    }

}

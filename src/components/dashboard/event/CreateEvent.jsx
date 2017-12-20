import React from "react";

import EventActions from '../../../actions/EventActions';

export default class CreateEvent extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            when: ""
        };

        this._submit = this._submit.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _submit() {
        EventActions.createEvent({
            name: this.state.name,
            when: this.state.when
        });
    }

    _handleChange(e) {
        const state = this.state;
        state[e.target.name] = e.target.value;
        this.setState(state);
    }

    render() {
        if (!this.props.showForm) {
            return (
                <div>
                    <button type="button"
                            onClick={this.props.toggle}
                            className="btn btn-primary btn-lg btn-block">
                        Créer un évènement
                    </button>
                </div>
            )
        }

        return (
            <div>
                <button type="button"
                        onClick={this.props.toggle}
                        className="btn btn-danger btn-lg btn-block">
                    Annuler
                </button>
                <form>
                    <div className="form-group">
                        <label htmlFor="name">Nom</label>
                        <input
                            type="text"
                            onChange={this._handleChange}
                            className="form-control"
                            name="name"
                            id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            type="date"
                            onChange={this._handleChange}
                            className="form-control"
                            name="when"
                            id="date" />
                    </div>
                    <button type="button"
                            onClick={this._submit}
                            className="btn btn-success btn-lg btn-block">
                        Créer
                    </button>
                </form>
            </div>
        );
    }

}

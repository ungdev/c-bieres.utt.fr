import React from 'react';

export default class CreateDrinker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            firstName: "",
            lastName: "",
            studentId: "",
        };

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e, f) {
        let nextState = this.state;
        this.state[f] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div className="container create-drinker-form">
                <form>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" value={this.state.firstName} onChange={e => this._handleChange(e, 'firstName')} className="form-control" id="firstName" placeholder="Prénom" />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" value={this.state.lastName} onChange={e => this._handleChange(e, 'lastName')} className="form-control" id="lastName" placeholder="Nom" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" placeholder="Numéro étudiant" onChange={e => this._handleChange(e, 'firstName')} className="form-control" id="studentId" />
                            <small className="form-text text-muted">(optionnel)</small>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="btn-group btn-block" role="group">
                                <button type="button" onClick={_ => this.props.submit(this.state)} className="form-control btn btn-primary">Créer</button>
                                <button type="button" onClick={this.props.close} className="form-control btn btn-danger">Annuler</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }

}

import React from 'react';

import BeerActions from '../../../actions/BeerActions';

export default class AddBeer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            type: "",
            description: ""
        };

        this._submitCreateForm = this._submitCreateForm.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(field, e) {
        this.setState(field, e.target.value);
    }

    _submitCreateForm() {
        BeerService.createBeer(this.state);
    }

    render() {
        return (
            <div className="card border-primary mb-3">
                <div className="card-header">Ajouter une bière</div>
                <div className="card-body text-primary">
                    <div className="card-text">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Nom</label>
                                    <input type="text" onChange={e => this._handleChange('name', e)} className="form-control" id="name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="type">Type</label>
                                    <input type="text" onChange={e => this._handleChange('type', e)} className="form-control" id="type" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea onChange={e => this._handleChange('description', e)} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="text-center">
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <button type="submit" onClick={this._submitCreateForm} className="btn btn-primary">Ajouter</button>
                                    <button type="button" onClick={this.props.close} className="btn btn-danger">Annuler</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

}

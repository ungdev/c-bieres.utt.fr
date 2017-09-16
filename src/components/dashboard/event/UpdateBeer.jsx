import React from 'react';

export default class UpdateBeer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            originalName: props.beer.name,
            beer: props.beer
        }

        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(field, e) {
        let nextState = this.state;
        nextState.beer[field] = e.target.value;
        this.setState(nextState);
    }

    render() {
        return (
            <div className="card w-100">
                <div className="card-body">
                    <h4 className="card-title">{this.state.originalName}</h4>
                    <div className="card-text">
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="name">Nouveau nom</label>
                                    <input type="text" value={this.state.beer.name} onChange={e => this._handleChange('name', e)} className="form-control" id="name" />
                                </div>
                                <div className="form-group col-md-6">
                                    <label htmlFor="type">Type</label>
                                    <input type="text" value={this.state.beer.type} onChange={e => this._handleChange('type', e)} className="form-control" id="type" />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea value={this.state.beer.description} onChange={e => this._handleChange('description', e)} className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <div className="text-center">
                                <div className="btn-group" role="group">
                                    <button type="submit" onClick={_ => this.props.update(this.state.beer)} className="btn btn-success">Modifier</button>
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

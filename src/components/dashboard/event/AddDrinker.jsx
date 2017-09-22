import React from 'react';

import DrinkerActions from '../../../actions/DrinkerActions';
import DrinkerStore from '../../../stores/DrinkerStore';

export default class AddDrinker extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            searchPattern: "",
            matches: []
        };

        this._handleSearchChange = this._handleSearchChange.bind(this);
    }

    componentDidMount() {
        // listen the store change
        DrinkerStore.addChangeListener(this._onDrinkerStoreChange.bind(this));
    }

    componentWillUnmount() {
        DrinkerStore.removeChangeListener(this._onDrinkerStoreChange);
    }

    _onDrinkerStoreChange() {
        this.setState({ matches: DrinkerStore.drinkers });
    }

    _handleSearchChange(e) {
        this.setState({ searchPattern: e.target.value });
        if (e.target.value.length > 2) {
            // refresh the matches
            DrinkerActions.getDrinkers({ multifield: e.target.value });
        }
    }

    render() {
        return (
            <div>
                <button className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#addDrinker">
                    Ajouter un participant
                </button>

                <div className="modal fade" tabIndex="-1" role="dialog" id="addDrinker">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajout d'un participant</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <input type="text" value={this.state.searchPattern} onChange={this._handleSearchChange} className="form-control" />
                                        <small className="form-text text-muted">Par nom, prénom, surnom, .. (3 caractères min)</small>
                                    </div>
                                </form>
                            </div>
                            <ul className="list-group">
                                {
                                    this.state.matches.map(match => <li className="list-group-item">{match.firstName} {match.lastName}</li>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

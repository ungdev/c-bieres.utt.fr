import React from 'react';

import EtuuttActions    from '../../../actions/EtuuttActions';
import AdminActions     from '../../../actions/AdminActions';

import EtuuttStore      from '../../../stores/EtuuttStore';

export default class AddAdmin extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matches: []
        };

        this._handleAddAdmin = this._handleAddAdmin.bind(this);
    }

    componentDidMount() {
        // listen the store change
        EtuuttStore.addChangeListener(this._onEtuuttStoreChange.bind(this));
    }

    componentWillUnmount() {
        EtuuttStore.removeChangeListener(this._onEtuuttStoreChange);
    }

    _onEtuuttStoreChange() {
        this.setState({ matches: EtuuttStore.matches.data });
    }

    _handleChange(e) {
        EtuuttActions.getMatches(e.target.value);
    }

    _handleAddAdmin(student) {
        AdminActions.addAdmin(student);
    }

    render() {
        return (
            <div>
                <button type="button" className="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#addAdmin">
                    Ajouter un administrateur
                </button>
                <div className="modal fade show" id="addAdmin" tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Ajouter un admin</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="pattern" className="form-control-label">Nom, prénom, surnom ou email</label>
                                        <input onChange={this._handleChange} type="text" className="form-control" id="pattern" />
                                    </div>
                                </form>
                                <div>
                                    <ul className="list-group">
                                        {
                                            this.state.matches.map(match => {
                                                return  <li className="list-group-item">
                                                            {match.firstName} {match.lastName}
                                                            <button type="button" onClick={_ => this._handleAddAdmin(match)} className="btn btn-add-drinker btn-secondary">Ajouter</button>
                                                        </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

import React from 'react';

import MatchesList      from '../../pieces/MatchesList';

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
        if (!this.props.showForm) {
            return (
                <div>
                    <button type="button"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={this.props.toggle}>
                        Ajouter un administrateur
                    </button>
                </div>
            )
        }

        return (
            <div>
                <button type="button"
                        className="btn btn-danger btn-lg btn-block"
                        onClick={this.props.toggle}>
                    Annuler
                </button>
                <form>
                    <br />
                    <div className="form-group">
                        <label htmlFor="name">Nom, prénom, surnom ou email</label>
                        <input
                            type="text"
                            onChange={this._handleChange}
                            className="form-control"
                            id="pattern" />
                    </div>

                    <MatchesList
                        matches={this.state.matches}
                        onSelect={this._handleAddAdmin} />
                </form>
            </div>
        );
    }

}

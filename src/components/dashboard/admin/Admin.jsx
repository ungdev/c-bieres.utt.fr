import React from 'react';

import AddAdmin from './AddAdmin.jsx';

import AdminActions from '../../../actions/AdminActions';
import AdminStore from '../../../stores/AdminStore';

export default class Admin extends React.Component {

    constructor() {
        super();

        this.state = {
            admins: [],
            showAddAdmin: false
        };

        this._deleteAdmin = this._deleteAdmin.bind(this);
        this._toggleAddAdmin = this._toggleAddAdmin.bind(this);
    }

    componentDidMount() {
        // listen the store change
        AdminStore.addChangeListener(this._onAdminStoreChange.bind(this));
        // trigger action for the store to load admins
        AdminActions.getAdmins();
    }

    componentWillUnmount() {
        AdminStore.removeChangeListener(this._onAdminStoreChange);
    }

    _onAdminStoreChange() {
        this.setState({ admins: AdminStore.admins });
    }

    _deleteAdmin(id) {
        AdminActions.deleteAdmin(id);
    }

    _toggleAddAdmin() {
        this.setState({ showAddAdmin: !this.state.showAddAdmin });
    }

    render() {
        return (
            <div>
                <h1>Administrateurs</h1>
                <AddAdmin />
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Numéro étudiant</th>
                                <th>Nom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.admins.map(admin => {
                                    return  <tr key={admin._id}>
                                                <td>{admin.studentId}</td>
                                                <td>{`${admin.firstName} ${admin.lastName}`}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="actions">
                                                        <button type="button" onClick={_ => this._deleteAdmin(admin._id)} className="btn btn-danger">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

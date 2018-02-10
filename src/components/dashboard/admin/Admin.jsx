import React from 'react'
import { connect } from 'react-redux'

import AddAdmin from './AddAdmin';
import Alert    from '../../pieces/Alert';

import { fetchAdmins, deleteAdmin, addAdmin } from '../../../actions'

const mapStateToProps = state => {
  return {
    admins: state.admins.items,
    beingDeleted: state.admins.adminBeingDeleted,
    deleteHasFailed: state.admins.deleteHasFailed,
    areLoading: state.admins.adminsAreLoading,
    fetchAdminsError: state.admins.fetchAdminsError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAdmins: () => dispatch(fetchAdmins()),
    deleteAdmin: (id) => dispatch(deleteAdmin(id)),
    addAdmin: (student) => dispatch(addAdmin(student)),
  }
}

class Admin extends React.Component {

    constructor() {
        super();

        this.state = {
            showAddAdmin: false
        };

        this.onDeleteClick = this.onDeleteClick.bind(this);
        this._toggleShowAddAdmin = this._toggleShowAddAdmin.bind(this);
    }

    componentDidMount() {
      this.props.fetchAdmins()
    }

    onDeleteClick(id) {
      this.props.deleteAdmin(id);
    }

    _toggleShowAddAdmin() {
        this.setState({ showAddAdmin: !this.state.showAddAdmin });
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-3 text-center">Administrateurs</h1>
                    <hr className="my-4" />
                    <div className="row justify-content-md-center">
                        <div className="col col-md-4">
                            <AddAdmin
                                showForm={this.state.showAddAdmin}
                                toggle={this._toggleShowAddAdmin}
                                onSubmit={this.props.addAdmin} />
                        </div>
                    </div>
                </div>
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
                                this.props.admins.map(admin => {
                                    return  <tr key={admin._id}>
                                                <td>{admin.studentId}</td>
                                                <td>{`${admin.firstName} ${admin.lastName}`}</td>
                                                <td>
                                                    <div className="btn-group" role="group" aria-label="actions">
                                                        <button type="button" onClick={_ => this.onDeleteClick(admin._id)} className="btn btn-danger">
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                })
                            }
                        </tbody>
                    </table>
                    {
                        (this.props.admins.length === 0) &&
                        <Alert
                            type="info"
                            message={<div>Aucun administrateur. Tu peux en ajouter un en cliquant sur <b>ajouter un administrateur</b></div>}
                            />
                    }
                </div>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

import React from 'react'
import createReactClass from 'create-react-class'

import AddAdmin from './AddAdmin'
import Alert    from './Alert'

const Admins = createReactClass({
  getInitialState() {
    return {
      showAddAdmin: false
    }
  },
  componentDidMount() {
    this.props.fetchAdmins()
  },
  toggleShowAddAdmin() {
    this.setState({ showAddAdmin: !this.state.showAddAdmin })
  },
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
                toggle={this.toggleShowAddAdmin}
                addAdmin={this.props.addAdmin}
                fetchMatches={this.props.fetchMatches}
                matches={this.props.matches} />
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
                                <button type="button" onClick={_ => this.props.deleteAdmin(admin._id)} className="btn btn-danger">
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
            <Alert type="info" message={
                <div>Aucun administrateur. Tu peux en ajouter un en cliquant sur <b>ajouter un administrateur</b></div>
            } />
          }
        </div>
      </div>
    )
  }
})

export default Admins

import React from 'react'
import createReactClass from 'create-react-class'

import AddAdmin from './AddAdmin'
import AdminsTable from './AdminsTable'
import Loader from './Loader'

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
                matches={this.props.matches}
                fetchingMatches={this.props.fetchingMatches} />
            </div>
          </div>
        </div>
        {
          this.props.fetchingAdmins
            ? <Loader />
            : <AdminsTable admins={this.props.admins} deleteAdmin={this.props.deleteAdmin} />
        }
      </div>
    )
  }
})

export default Admins

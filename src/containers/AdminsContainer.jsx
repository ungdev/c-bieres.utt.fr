import { connect } from 'react-redux'
import { fetchAdmins, fetchMatches, deleteAdmin, addAdmin } from '../actions'
import Admins from '../components/Admins'

const mapStateToProps = state => {
  return {
    admins: state.admins.items,
    matches: state.admins.matches,
    fetchingAdmins: state.admins.fetchingAdmins,
    fetchingMatches: state.admins.fetchingMatches,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAdmins: () => dispatch(fetchAdmins()),
    deleteAdmin: (id) => dispatch(deleteAdmin(id)),
    addAdmin: (student) => dispatch(addAdmin(student)),
    fetchMatches: (pattern) => dispatch(fetchMatches(pattern))
  }
}

const AdminsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Admins)

export default AdminsContainer

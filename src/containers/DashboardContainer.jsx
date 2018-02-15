import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { goHome } from '../actions'
import authHelper from '../helpers/localStorage/authHelper'
import Dashboard from '../components/Dashboard'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => {
      authHelper.clean()
      return dispatch(push('/'))
    }
  }
}

const DashboardContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard)

export default DashboardContainer

import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/Home'

import { fetchNextEvent, login, sendAuthorizationCode, register, unregister, checkExistingJWT } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nextEvent: state.events.items.filter(event => state.events.next === event._id)[0],
    isAdmin: state.auth.payload.isAdmin,
    jwt: state.auth.payload.jwt,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNextEvent: () => dispatch(fetchNextEvent()),
    login: () => dispatch(login()),
    sendAuthorizationCode: (code) => dispatch(sendAuthorizationCode(code)),
    register: () => dispatch(register()),
    unregister: () => dispatch(unregister()),
    goDashboard: () => dispatch(push('/dashboard/event')),
    checkExistingJWT: () => dispatch(checkExistingJWT())
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer

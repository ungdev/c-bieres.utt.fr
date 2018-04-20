import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/Home'

import { fetchNextEvent, login, logout, sendAuthorizationCode, register, unregister,
  checkExistingJWT, checkRegistration } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nextEventId: state.events.next,
    nextEvent: state.events.items.filter(event => state.events.next === event._id)[0],
    isAdmin: state.auth.payload.isAdmin,
    jwt: state.auth.jwt,
    firstName: state.auth.payload.firstName,
    registration: state.registrations.registration,
    registrationFailed: state.registrations.registrationFailed
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNextEvent: () => dispatch(fetchNextEvent()),
    login: () => dispatch(login()),
    logout: () => dispatch(logout()),
    sendAuthorizationCode: (code) => dispatch(sendAuthorizationCode(code)),
    register: (nextEventId) => dispatch(register(nextEventId)),
    unregister: (nextEventId) => dispatch(unregister(nextEventId)),
    goDashboard: () => dispatch(push('/dashboard/event')),
    goMailListSettings: () => dispatch(push('/maillist')),
    checkExistingJWT: () => dispatch(checkExistingJWT()),
    checkRegistration: () => dispatch(checkRegistration()),
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer

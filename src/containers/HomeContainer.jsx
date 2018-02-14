import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import Home from '../components/Home'

import { fetchNextEvent, fetchRedirectLink, sendAuthorizationCode, register, unregister } from '../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    nextEvent: state.events.items.filter(event => state.events.next === event._id)[0],
    isAdmin: state.auth.payload.isAdmin
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchNextEvent: () => dispatch(fetchNextEvent()),
    fetchRedirectLink: (action) => dispatch(fetchRedirectLink(action)),
    sendAuthorizationCode: (code) => dispatch(sendAuthorizationCode(code)),
    register: (code) => dispatch(register(code)),
    unregister: (code) => dispatch(unregister(code)),
    goOldEvents: () => dispatch(push('/olds')),
    goDashboard: () => dispatch(push('/dashboard/event'))
  }
}

const HomeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default HomeContainer

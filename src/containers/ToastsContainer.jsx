import { connect } from 'react-redux'
import { clearToast } from '../actions'
import Toasts from '../components/Toasts'

const mapStateToProps = state => {
  return {
    toasts: state.toasts
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (id) => dispatch(clearToast(id))
  }
}

const ToastsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Toasts)

export default ToastsContainer

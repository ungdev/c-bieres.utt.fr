import { connect } from 'react-redux'
import MailList from '../components/MailList'

import { fetchAccount, updateAccount } from '../actions'

const mapStateToProps = state => {
  console.log("update account:", state.auth.account)
  return {
    account: state.auth.account
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchAccount: () => dispatch(fetchAccount()),
    updateAccount: (account) => dispatch(updateAccount(account))
  }
}

const MailListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MailList)

export default MailListContainer

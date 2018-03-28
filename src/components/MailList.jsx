import React from 'react'
import { Link } from 'react-router-dom'
import createReactClass from 'create-react-class'

const MailList = createReactClass({
  componentDidMount() {
    this.props.fetchAccount()
  },
  handleChange() {
    this.props.updateAccount(Object.assign({}, this.props.account, {
      inMailList: !this.props.account.inMailList
    }))
  },
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid old-events__jumbotron">
          <div className="container">
            <h1 className="display-3">Mail List</h1>
            <p className="lead">
              En étant dans la mail list, tu seras notifié par mail chaque fois qu'un nouvel évènement aura lieu.

              Tu peux t'inscrire ou te désinscrire de la mail list à tout moment, en cochant ou décochant
              la checkbox ci dessous.
            </p>
            <hr className="my-4" />
            <p>
              <Link className="btn btn-primary" to="/">Retour à la page principal</Link>
            </p>
          </div>
        </div>
        <div className="container maillist-container">
          <label className="checkbox-container">Mail List
            <input type="checkbox" onChange={this.handleChange} checked={this.props.account.inMailList} />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    )
  }
})

export default MailList

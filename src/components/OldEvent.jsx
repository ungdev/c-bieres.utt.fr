import React from 'react'
import { Link } from 'react-router-dom'
import createReactClass from 'create-react-class'
import Beer from './Beer'
import { toHumanDate } from '../helpers/dateHelper'

const OldEvent = createReactClass({
  componentDidMount() {
    this.props.fetchEvents()
  },
  render() {
    if (!this.props.event) {
        return null
    }

    return (
      <div>
        <div className="old-event__header">
          <hr className="my-4 old-event__header__seperator" />
          <div className="container old-event__header__inner">
            <h2 className="display-4">{this.props.event.name}</h2>
            <p>Le <b>{toHumanDate(this.props.event.when)}</b></p>
            <Link to="/olds" className="btn btn-light old-event__header__inner__button--right">
              Retour à la liste
            </Link>
          </div>
        </div>
        <div className="container old-event__beers">
          {this.props.event.beers.map((beer, i) => <Beer key={i} beer={beer} left={i%2 === 0} />)}
        </div>
      </div>
    )
  }
})

export default OldEvent

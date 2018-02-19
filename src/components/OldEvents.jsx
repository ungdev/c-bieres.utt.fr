import React from 'react'
import { Link } from 'react-router-dom'
import createReactClass from 'create-react-class'

import OldEventsTable from './OldEventsTable'
import Loader from './Loader'

const OldEvents = createReactClass({
  componentDidMount() {
    this.props.fetchEvents()
  },
  render() {
    return (
      <div>
        <div className="jumbotron jumbotron-fluid old-events__jumbotron">
          <div className="container">
            <h1 className="display-3">Anciens évènements</h1>
            <p className="lead">
              Tu trouvera ci dessous la liste des anciens évènements du club bières,
              avec l'ensemble des bières pour chaque évènement.
            </p>
            <hr className="my-4" />
            <p>
              <Link className="btn btn-primary" to="/">Retour à la page principal</Link>
            </p>
          </div>
        </div>
        <div className="container">
          {
            this.props.fetchingEvents
              ? <Loader />
              : <OldEventsTable events={this.props.events} />
          }
        </div>
      </div>
    )
  }
})

export default OldEvents

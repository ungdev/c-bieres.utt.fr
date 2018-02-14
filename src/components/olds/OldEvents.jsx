import React from 'react'
import OldEventsRow from './OldEventsRow'

class OldEvents extends React.Component {

  componentDidMount() {
    this.props.fetchEvents()
  }

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
              <button type="button" onClick={this._handleClick} className="btn btn-primary">
                Retour à la page principal
              </button>
            </p>
          </div>
        </div>
        <div className="container">
          <table className="table table-hover table-striped old-events__table">
            <tbody>
              {this.props.events.map((event, i) => <OldEventsRow
                                                  key={i}
                                                  event={event}
                                                  eventDate={new Date(event.when)}
                                                  onClick={this.props.goOldEvent} />)}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default OldEvents

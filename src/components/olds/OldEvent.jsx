import React from 'react'
import { connect } from 'react-redux'

import Beer from '../home/Beer'

import { fetchEvents } from '../../actions'

const mapStateToProps = (state, ownProps) => {
  return {
    // only past events, sorted by date
    event: state.events.items
      .filter(event => event._id == ownProps.match.params.id)[0],
    areLoading: state.events.itemsAreLoading,
    haveFailed: state.events.itemsHaveFailed,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchEvents: () => dispatch(fetchEvents())
  }
}

class OldEvent extends React.Component {

  constructor() {
      super();
      this._handleClick = this._handleClick.bind(this);
  }

  componentDidMount() {
    this.props.fetchEvents()
  }

  _handleClick() {
      this.props.history.push('/olds');
  }

  render() {
    const event = this.props.event;

    if (!event) {
        return null;
    }

    const eventDate = new Date(event.when);
    const humanDate = `${eventDate.getUTCDate()}/${eventDate.getUTCMonth() + 1}/${eventDate.getUTCFullYear()}`;

    return (
      <div>
        <div className="old-event__header">
          <hr className="my-4 old-event__header__seperator" />
          <div className="container old-event__header__inner">
            <h2 className="display-4">{event.name}</h2>
            <p>Le <b>{humanDate}</b></p>
            <button className="btn btn-light old-event__header__inner__button--right"
                  onClick={this._handleClick}>
              Retour à la liste
            </button>
          </div>
        </div>
        <div className="container old-event__beers">
          {
            event.beers.map((beer, i) => <Beer
                                            key={i}
                                            beer={beer}
                                            left={i%2 === 0} />)
          }
        </div>
      </div>
    );
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(OldEvent)

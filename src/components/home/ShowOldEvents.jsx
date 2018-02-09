import React from 'react';
import PropTypes from 'prop-types'
import Button from '../pieces/Button'

const ShowOldEvents = ({ onClick }) => (
  <div className="show-old-events">
      <div className="container text-center">
          <p>
              <img className="img-fluid" src="images/meme.jpg" />
          </p>
          <p className="lead show-old-events__text">
              Tu peux trouver les bières que tu as rencontré aux précédents club bières en
              consultant les anciens évènements.
          </p>
          <Button content="Voir les anciens évènements" theme="primary" classes="btn-lg" onClick={onClick} />
      </div>
  </div>
)

ShowOldEvents.propTypes = {
  onClick: PropTypes.func.isRequired,
}

export default ShowOldEvents

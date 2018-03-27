import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Button from './Button'

const ShowOldEvents = () => (
  <div className="show-old-events">
    <div className="container text-center">
      <p>
        <img className="img-fluid" src="images/meme.jpg" />
      </p>
      <p className="lead show-old-events__text">
        Tu peux trouver les bières que tu as rencontré aux précédents club bières en
        consultant les anciens évènements.
      </p>
      <Link to="/olds" className="btn btn-primary btn-lg">Voir les anciens évènements</Link>
    </div>
  </div>
)

export default ShowOldEvents

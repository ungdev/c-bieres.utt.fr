import React from 'react'
import PropTypes from 'prop-types'
import ImageWrapper from './ImageWrapper'

const Beer = ({ beer, left, displayColumn }) => (
  <div className="side-image">
    {!displayColumn && left && <ImageWrapper path={beer.image} />}
    <div className="side-image-content">
      <span className="badge badge-primary">{beer.type}</span>
      {
        beer.degree &&
        <span className="badge badge-warning">{beer.degree} %</span>
      }
      <h2>{beer.name}</h2>
      <p>{beer.description}</p>
    </div>
    {(displayColumn || !left) && <ImageWrapper path={beer.image} />}
  </div>
)

Beer.propTypes = {
  beer: PropTypes.shape({
    degree: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  diplayColumn: PropTypes.bool,
  left: PropTypes.bool.isRequired,
}

export default Beer

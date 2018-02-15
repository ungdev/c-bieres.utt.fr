import React from 'react'
import PropTypes from 'prop-types'

const ImageWrapper = ({ path }) => (
  <div className="images-wrapper" style={{
      backgroundImage: `url(${path ? (process.env.SERVER_URI+path) : 'images/beer.png'})`
    }}>
  </div>
)

ImageWrapper.propTypes = {
  path: PropTypes.string,
}

export default ImageWrapper

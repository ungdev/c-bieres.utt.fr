import React from 'react';
import PropTypes from 'prop-types'

const Alert = ({ type, message }) => (
  <div className="alert-message-container">
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  </div>
)

Alert.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default Alert

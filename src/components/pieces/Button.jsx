import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ theme, onClick, content, classes }) => (
  <button type="button" className={`btn btn-${theme} ${classes}`} onClick={onClick}>
    {content}
  </button>
)

Button.propTypes = {
  theme: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'link']),
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
  classes: PropTypes.string,
}

export default Button

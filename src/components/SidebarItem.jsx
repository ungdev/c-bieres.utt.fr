import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const SidebarItem = ({ isActive, value, text, onClick }) => (
  <li className="sidebar__tab">
    <Link className={"nav-link sidebar__tab__link " + (isActive && "active")}
        onClick={_ => onClick(value)}
        to={`/dashboard/${value}`}>
      <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
      {text}
    </Link>
  </li>
)

SidebarItem.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SidebarItem

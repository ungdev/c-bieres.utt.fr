import React from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

const SelectListItem = ({ item, onClick }) => (
  <li className="list-group-item">
    {item.firstName} {item.lastName}
    <Button
      onClick={_ => onClick(item)}
      content="Ajouter"
      theme="success"/>
  </li>
)

SelectListItem.propTypes = {
  item: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SelectListItem

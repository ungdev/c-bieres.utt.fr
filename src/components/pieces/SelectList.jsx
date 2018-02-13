import React from 'react'
import PropTypes from 'prop-types'
import SelectListItem from './SelectListItem'

const SelectList = ({ items, onClick }) => (
  <div className="matches-list">
    <ul className="list-group matches-list">
      {items.map((item, i) => <SelectListItem key={i} item={item} onClick={onClick} />)}
    </ul>
  </div>
)

SelectList.propTypes = {
  items: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default SelectList

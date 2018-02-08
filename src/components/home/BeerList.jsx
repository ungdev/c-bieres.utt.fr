import React from 'react'
import PropTypes from 'prop-types'
import Beer from './Beer'

const BeerList = ({ beers, diplayColumn }) => (
  <div className="beers">
    <h1 className="beers__title">Les bières</h1>
    {
      beers.length
      ?
        beers.map((beer, i) => <Beer key={i} diplayColumn={diplayColumn} left={i%2 === 0} beer={beer} />)
      :
        <div className="beers__message">
            Les bières seront ajoutées prochainement.
        </div>
    }
  </div>
)

BeerList.propTypes = {
  beers: PropTypes.array.isRequired,
  diplayColumn: PropTypes.bool.isRequired,
}

export default BeerList

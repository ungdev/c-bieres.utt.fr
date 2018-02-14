import React from 'react'
import createReactClass from 'create-react-class'
import SelectList from './pieces/SelectList'

const AddAdmin = ({ matches, showForm, toggle, fetchMatches, addAdmin }) => {
  if (!showForm) {
    return (
      <div>
        <button type="button"
                className="btn btn-primary btn-lg btn-block"
                onClick={toggle}>
          Ajouter un administrateur
        </button>
      </div>
    )
  }

  return (
    <div>
      <button type="button"
              className="btn btn-danger btn-lg btn-block"
              onClick={toggle}>
        Annuler
      </button>
      <form>
        <br />
        <div className="form-group">
          <label htmlFor="name">Nom, prénom, surnom ou email</label>
          <input
            type="text"
            onChange={e => fetchMatches(e.target.value)}
            className="form-control"
            id="pattern" />
        </div>
        <SelectList items={matches} onClick={addAdmin} />
      </form>
    </div>
  )
}

export default AddAdmin

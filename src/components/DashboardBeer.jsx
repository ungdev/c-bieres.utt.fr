import React from 'react'

const UpdateEventBeer = ({ beer, showActions, updateBeer, deleteBeer }) => (
  <div className="showbeer-jumbotron jumbotron">
    <div className="row">
      <div className="col-3">
        {
          (beer.image && beer.image != 'null')
          ?
            <img className="img-fluid" src={process.env.REACT_APP_SERVER_URI + beer.image} />
          :
            <div className="showbeer-noimage">
              Clique sur "modifier" pour ajouter une image.
            </div>
        }
      </div>
      <div className="col-9">
        <h4>{beer.name}</h4>
        <span className="badge badge-primary">{beer.type}</span>
        <span className="badge badge-warning">{beer.degree}</span>
        <p className="showbeer-description">{beer.description}</p>
        {
          showActions &&
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary"
                onClick={_ => updateBeer(beer)}>
              Modifier
            </button>
            <button type="button" className="btn btn-danger"
                onClick={_ => deleteBeer(beer._id)}>
              Supprimer
            </button>
          </div>
        }
      </div>
    </div>
  </div>
)

export default UpdateEventBeer

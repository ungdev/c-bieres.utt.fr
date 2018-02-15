import React from 'react'

const Beer = ({ beer, showActions }) => (
  <div className="showbeer-jumbotron jumbotron">
    <div className="row">
      <div className="col-3">
        {
          (this.state.beer.image && this.state.beer.image != 'null')
          ?
            <img className="img-fluid" src={process.env.REACT_APP_SERVER_URI + this.state.beer.image} />
          :
            <div className="showbeer-noimage">
              Clique sur "modifier" pour ajouter une image.
            </div>
        }
      </div>
      <div className="col-9">
        <h4>{this.state.beer.name}</h4>
        <span className="badge badge-primary">{this.state.beer.type}</span>
        <span className="badge badge-warning">{this.state.beer.degree}</span>
        <p className="showbeer-description">{this.state.beer.description}</p>
        {
          this.state.showActions &&
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-primary"
                onClick={_ => this.props.update(this.state.beer)}>
              Modifier
            </button>
            <button type="button" className="btn btn-danger"
                onClick={_ => this.props.delete(this.state.beer._id)}>
              Supprimer
            </button>
          </div>
        }
      </div>
    </div>
  </div>
)

export default Beer

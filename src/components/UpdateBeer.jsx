import React from 'react'
import createReactClass from 'create-react-class'

const UpdateBeer = createReactClass({
  getInitialState() {
    return {
      beer: this.props.beer,
      originalName: this.props.beer.name
    }
  },
  handleChange(e) {
    this.setState({
      beer: Object.assign({}, this.state.beer, {
        [e.target.name]: e.target.name
      })
    })
  },
  handleFileUpload(e) {
    this.setState({
      beer: Object.assign({}, this.state.beer, {
        file: e.target.files[0]
      })
    })
  },
  render() {
    return (
      <div className="card w-100">
        <div className="card-body">
          <h4 className="card-title">{this.state.originalName}</h4>
          <div className="card-text">
            <form>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="name">Nouveau nom</label>
                  <input type="text" value={this.state.beer.name} name="name" onChange={this.handleChange}
                    className="form-control" id="name" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="type">Type</label>
                  <input type="text" value={this.state.beer.type} name="type" onChange={this.handleChange}
                    className="form-control" id="type" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="degree">Degrés</label>
                  <input type="number" step="0.1" value={this.state.beer.degree} name="degree" onChange={this.handleChange}
                    className="form-control" id="degree" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea value={this.state.beer.description} name="description" Change={this.handleChange}
                  className="form-control" id="description" rows="3">
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="img" />
              </div>
              <div className="text-center">
                <div className="btn-group" role="group">
                  <button type="button" onClick={_ => this.props.update(this.state.beer)} className="btn btn-success">
                    Modifier
                  </button>
                  <button type="button" onClick={this.props.close} className="btn btn-danger">
                    Annuler
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default UpdateBeer

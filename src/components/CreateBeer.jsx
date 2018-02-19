import React from 'react'
import createReactClass from 'create-react-class'

const CreateBeer = createReactClass({
  getInitialState() {
    return {name: '', type: '', description: '', degree: 0, event_id: this.props.eventId}
  },
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  },
  handleFileUpload(e) {
    this.setState({ file: e.target.files[0] })
  },
  submitCreateForm() {
    // Create a new FormData object and fill it with the state values
    let form = new FormData()
    Object.keys(this.state).map(attr => {
      form.append(attr, this.state[attr])
    })
    this.props.createBeer(form)
  },
  render() {
    return (
      <div className="card border-primary mb-3">
        <div className="card-header">Ajouter une bière</div>
        <div className="card-body text-primary">
          <div className="card-text">
            <form>
              <div className="form-row">
                <div className="form-group col-md-4">
                  <label htmlFor="name">Nom</label>
                  <input type="text" value={this.state.name} name="name" onChange={this.handleChange} className="form-control" id="name" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="type">Type</label>
                  <input type="text" value={this.state.type} name="type" onChange={this.handleChange} className="form-control" id="type" />
                </div>
                <div className="form-group col-md-4">
                  <label htmlFor="degree">Degrés</label>
                  <input type="number" value={this.state.degree} name="degree" step="0.1" onChange={this.handleChange} className="form-control"
                    id="degree" />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea name="description" onChange={this.handleChange} className="form-control" id="description"
                  rows="3">
                  {this.state.description}
                </textarea>
              </div>
              <div className="form-group">
                <label htmlFor="img">Image</label>
                <input type="file" onChange={this.handleFileUpload} className="form-control-file" id="img" />
              </div>
              <div className="text-center">
                <div className="btn-group" role="group">
                  <button type="button" onClick={this.submitCreateForm} className="btn btn-primary">
                    Ajouter
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

export default CreateBeer

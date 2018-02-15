import React from 'react'
import createReactClass from 'create-react-class'

const CreateEvent = createReactClass({
  getInitialState() {
    return {name: '', when: ''}
  },
  onSubmit() {
    this.props.createEvent({...this.state})
  },
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  },
  render() {
    if (!this.props.showForm) {
      return (
        <div>
          <button type="button" onClick={this.props.toggle} className="btn btn-primary btn-lg btn-block">
            Créer un évènement
          </button>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.props.toggle} type="button" className="btn btn-danger btn-lg btn-block">
          Annuler
        </button>
        <form>
          <div className="form-group">
            <label htmlFor="name">Nom</label>
            <input onChange={this.handleChange} type="text" name="name" id="name" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input onChange={this.handleChange} type="date" className="form-control" name="when" id="date" />
          </div>
          <button onClick={this.onSubmit} type="button" className="btn btn-success btn-lg btn-block">
            Créer
          </button>
        </form>
      </div>
    )
  }
})

export default CreateEvent

import React from 'react'
import createReactClass from 'create-react-class'

const CreateDrinker = createReactClass({
  getInitialState() {
    return {firstName: "", lastName: "", studentId: ""}
  },
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  },
  render() {
    return (
      <div className="container create-drinker-form">
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="text" value={this.state.firstName} name="firstName" onChange={this.handleChange}
                className="form-control" id="firstName" placeholder="Prénom" />
            </div>
            <div className="form-group col-md-6">
              <input type="text" value={this.state.lastName} name="lastName" onChange={this.handleChange}
                className="form-control" id="lastName" placeholder="Nom" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <input type="text" placeholder="Numéro étudiant" value={this.state.studentId} onChange={this.handleChange}
                className="form-control" name="studentId" id="studentId" />
              <small className="form-text text-muted">(optionnel)</small>
            </div>
            <div className="form-group col-md-6">
              <div className="btn-group btn-block" role="group">
                <button type="button" onClick={_ => this.props.submit(this.state)} className="form-control btn btn-primary">
                  Créer
                </button>
                <button type="button" onClick={this.props.close} className="form-control btn btn-danger">
                  Annuler
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
})

export default CreateDrinker

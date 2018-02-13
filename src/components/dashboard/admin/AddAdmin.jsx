import React from 'react'
import { connect } from 'react-redux'

import SelectList      from '../../pieces/SelectList';

import { fetchMatches } from '../../../actions'

const mapStateToProps = state => {
  return {
    matches: state.admins.matches
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchMatches: (pattern) => dispatch(fetchMatches(pattern))
  }
}

class AddAdmin extends React.Component {

    constructor(props) {
        super(props);

        this._handleAddAdmin = this._handleAddAdmin.bind(this);
        this._handleChange = this._handleChange.bind(this);
    }

    _handleChange(e) {
        this.props.fetchMatches(e.target.value);
    }

    _handleAddAdmin(student) {
        this.props.onSubmit(student);
    }

    render() {
        if (!this.props.showForm) {
            return (
                <div>
                    <button type="button"
                            className="btn btn-primary btn-lg btn-block"
                            onClick={this.props.toggle}>
                        Ajouter un administrateur
                    </button>
                </div>
            )
        }

        return (
            <div>
                <button type="button"
                        className="btn btn-danger btn-lg btn-block"
                        onClick={this.props.toggle}>
                    Annuler
                </button>
                <form>
                    <br />
                    <div className="form-group">
                        <label htmlFor="name">Nom, prénom, surnom ou email</label>
                        <input
                            type="text"
                            onChange={this._handleChange}
                            className="form-control"
                            id="pattern" />
                    </div>

                    <SelectList items={this.props.matches} onClick={this._handleAddAdmin} />
                </form>
            </div>
        );
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(AddAdmin)

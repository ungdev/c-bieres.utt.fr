import React from 'react';

export default class DeleteEventConfirm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            event: props.event
        };

        this._close = this._close.bind(this);
        this._delete = this._delete.bind(this);
    }

    componentDidMount() {
        $('#confirmEventDeletion').modal('show');
    }

    _hideModal() {
        $('#confirmEventDeletion').modal('hide');
    }

    _close() {
        this._hideModal();
        this.props.close();
    }

    _delete() {
        this._hideModal();
        this.props.delete(this.state.event._id);
    }

    render() {
        return (
            <div className="modal fade" id="confirmEventDeletion" tabIndex="-1" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            Confirmation
                        </div>
                        <div className="modal-body">
                            Es tu sûr de vouloir supprimer l'évènement <b>{this.state.event.name}</b> ?
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={this._close} className="btn btn-secondary">Annuler</button>
                            <button type="button" onClick={this._delete} className="btn btn-danger">Supprimer</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}

import BaseStore from './BaseStore';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._nextId = 0;
        this._alerts = {};
    }

    get alerts() {
        return Object.values(this._alerts);
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "NEW_ALERT":
                this._alerts[this._nextId] = action.alert;
                this._alerts[this._nextId].id = this._nextId;
                this._nextId++;
                this.emitChange();
                break;
            case "ALERT_VIEWED":
                delete this._alerts[action.id];
                this.emitChange();
                break;
        }
    }

}

export default new AuthStore();

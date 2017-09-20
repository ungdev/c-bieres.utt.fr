import BaseStore from './BaseStore';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._admins = {};
    }

    get admins() {
        return Object.values(this._admins);
    }

    addAdmin(admin) {
        this._admins[admin._id] = admin;
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "ADMINS_FETCHED":
                action.admins.map(admin => this.addAdmin(admin));
                this.emitChange();
                break;
            case "ADMINS_FETCHED":
                this.addAdmin(action.admin);
                this.emitChange();
                break;
            case "ADMIN_DELETED":
                delete this._admins[action.id];
                this.emitChange();
                break;
        }
    }

}

export default new AuthStore();

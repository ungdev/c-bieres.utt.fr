import BaseStore from './BaseStore';
import EventService from '../services/EventService';
import authHelper from '../helpers/localStorage/authHelper';
import jwtDecode from 'jwt-decode';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._payload = {};
    }

    get payload() {
        return this._payload;
    }

    get isAdmin() {
        return this._payload.isAdmin;
    }

    get accessToken() {
        return this._payload.accessToken;
    }

    _saveJWT(jwt) {
        authHelper.set(jwt);
        this._payload = jwtDecode(jwt);
        this.emitChange();
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "LOGGED":
                this._saveJWT(action.jwt);
                break;
        }
    }

}

export default new AuthStore();

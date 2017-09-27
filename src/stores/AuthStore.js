import BaseStore from './BaseStore';
import EventService from '../services/EventService';
import authHelper from '../helpers/localStorage/authHelper';
import jwtDecode from 'jwt-decode';

class AuthStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this.payload = {};
    }

    _saveJWT(jwt) {
        authHelper.set(jwt);
        console.log(jwtDecode(jwt));
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

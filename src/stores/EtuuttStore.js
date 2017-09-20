import BaseStore from './BaseStore';

class EtuuttStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._matches = [];
    }

    get matches() {
        return this._matches;
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "MATCHES_FETCHED":
                this._matches = action.matches;
                this.emitChange();
                break;
        }
    }

}

export default new EtuuttStore();

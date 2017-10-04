import BaseStore from './BaseStore';

class DrinkerStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._serverDrinkers = [];
        this._etuuttDrinkers = [];
    }

    get serverDrinkers() {
        return this._serverDrinkers;
    }

    get etuuttDrinkers() {
        return this._etuuttDrinkers;
    }

    /**
     * Handle Actions from DrinkerActions
     *
     * @param {object} action
     */
    _handleActions(action) {
        switch(action.type) {
            case "DRINKERS_FETCHED":
                this._etuuttDrinkers = action.etuuttDrinkers;
                this._serverDrinkers = action.serverDrinkers;
                this.emitChange();
                break;
        }
    }

}

export default new DrinkerStore();

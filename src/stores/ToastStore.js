import BaseStore from './BaseStore';

class ToastStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));

        this._nextId = 0;
        this._toasts = {};
    }

    get toasts() {
        return Object.values(this._toasts);
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "NEW_TOAST":
                this._toasts[this._nextId] = action.toast;
                this._toasts[this._nextId].id = this._nextId;
                this._nextId++;
                this.emitChange();
                break;
            case "TOAST_VIEWED":
                delete this._toasts[action.id];
                this.emitChange();
                break;
        }
    }

}

export default new ToastStore();

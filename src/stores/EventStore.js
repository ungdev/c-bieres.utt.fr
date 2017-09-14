import BaseStore from './BaseStore';
import EventService from '../services/EventService';

class EventStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));
        this._data = [];
    }

    get events() {
        return this._data;
    }

    insertIfAbsent(newEvent) {
        if (this._data.filter(event => event._id === newEvent._id).length === 0)
            this._data.push(newEvent);
    }

    getById(id) {
        for (let e of this._data) {
            if (e._id === id) {
                return e;
            }
        }
        return {};
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "GET_EVENTS":
                this._data = action.events;
                this.emitChange();
                break;
            case "GET_EVENT":
                this.insertIfAbsent(action.event);
                this.emitChange();
                break;
            case "CREATE_EVENT":
                this._data.push(action.event);
                this.emitChange();
                break;
            case "DELETE_EVENT":
                this._data = this._data.filter(event => event._id !== action.id);
                this.emitChange();
                break;
        }
    }

}

export default new EventStore();

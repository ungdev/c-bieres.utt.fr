import BaseStore from './BaseStore';
import EventService from '../services/EventService';

class EventStore extends BaseStore {

    constructor() {
        super();
        this.subscribe(() => this._handleActions.bind(this));
        this._data = {};
    }

    get events() {
        return Object.values(this._data);
    }

    _insert(e) {
        this._data[e._id] = e;
    }

    _remove(id) {
        delete this.data[id];
    }

    getById(id) {
        return this._data[id];
    }

    getNext() {
        const now_DateTime = new Date().getTime();
        let next = null;
        for (let event_id in this._data) {
            const event_date = this._data[event_id].when;
            const event_DateTime = new Date(event_date).getTime();
            if (event_DateTime > now_DateTime && (next === null || event_date - now_DateTime < new Date(next.when).getTime())) {
                next = this._data[event_id];
            }
        }
        return next;
    }

    /**
     * Handle Actions from BottleTypeActions
     *
     * @param {object} action : the action
     */
    _handleActions(action) {
        switch(action.type) {
            case "GET_EVENTS":
                action.events.map(e => this._insert(e));
                this.emitChange();
                break;
            case "GET_EVENT":
                this._insert(action.event);
                this.emitChange();
                break;
            case "CREATE_EVENT":
                this._insert(action.event);
                this.emitChange();
                break;
            case "DELETE_EVENT":
                this._remove(action.id);
                this.emitChange();
                break;
            case "CREATE_BEER":
                this._data[action.beer.event_id].beers.push(action.beer);
                this.emitChange();
                break;
        }
    }

}

export default new EventStore();

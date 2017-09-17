import AppDispatcher from '../dispatchers/AppDispatcher';
import EventService from '../services/EventService';
import registrationHelper from '../helpers/registrationHelper';

export default {

    /**
     * Register a user to the next event, by his
     * authorization_code
     *
     - @param string authorization_code
     */
    register(authorization_code) {
        EventService.register(authorization_code)
            .then(response => {
                // save the registration in localStorage
                registrationHelper.set(response.data.event._id);

                AppDispatcher.dispatch({
                    type: 'NEW_ALERT',
                    alert: {
                        type: "success",
                        message: "Inscription réussie !"
                    }
                });
            })
            .catch(err => {
                if (err.response.status == 409)
                    AppDispatcher.dispatch({
                        type: 'NEW_ALERT',
                        alert: {
                            type: "danger",
                            message: "Tu es déjà inscrit !"
                        }
                    });
                });
    },

    getEvents() {
        EventService.get()
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENTS',
                    events: response.data
                });
            })
            .catch(err => console.error(err));
    },

    getEvent(id) {
        EventService.getById(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.log(err));
    },

    getNextEvent() {
        EventService.getNext()
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'GET_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.log(err));
    },

    createEvent(data) {
        EventService.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'CREATE_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.error(err));
    },

    updateEvent(id, data) {
        EventService.update(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'UPDATE_EVENT',
                    event: response.data
                });
            })
            .catch(err => console.error(err));
    },

    deleteEvent(id) {
        EventService.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DELETE_EVENT',
                    id
                });
            })
            .catch(err => console.error(err));
    }

}

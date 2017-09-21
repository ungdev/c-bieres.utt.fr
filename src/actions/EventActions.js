import AppDispatcher from '../dispatchers/AppDispatcher';
import EventService from '../services/EventService';
import registrationHelper from '../helpers/localStorage/registrationHelper';

export default {

    /**
     * Unregister a user to the next event, by his
     * authorization_code
     *
     - @param string authorization_code
     */
    unregister(authorization_code) {
        EventService.unregister(authorization_code)
            .then(response => {
                // save the registration in localStorage
                registrationHelper.clean();

                AppDispatcher.dispatch({
                    type: 'NEW_ALERT',
                    alert: {
                        type: "success",
                        message: "Vous êtes maintenant desinscrit."
                    }
                });
                AppDispatcher.dispatch({
                    type: 'UNREGISTER',
                });
            })
            .catch(err => console.log(err));
    },

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
                AppDispatcher.dispatch({
                    type: 'REGISTER',
                });
            })
            .catch(err => {
                if (err.response.status == 409) {
                    // save the registration in localStorage
                    registrationHelper.set(err.response.data.event._id);

                    AppDispatcher.dispatch({
                        type: 'NEW_ALERT',
                        alert: {
                            type: "danger",
                            message: "Tu es déjà inscrit !"
                        }
                    });

                    AppDispatcher.dispatch({
                        type: 'REGISTER',
                    });
                }
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

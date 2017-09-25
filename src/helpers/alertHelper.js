import AppDispatcher from '../dispatchers/AppDispatcher';

/**
 * Display a new alert, for the AlertStore
 *
 * @param {string} type (alert type)
 * @param {string} message (the message to display in the alert)
 */
function createNewAlert(type, message) {
    // do nothing if there is no message
    if (!message) return;

    AppDispatcher.dispatch({
        type: 'NEW_ALERT',
        alert: {type, message}
    });
}

exports.success = function(message) {
    createNewAlert("success", message);
}

exports.info = function(message) {
    createNewAlert("info", message);
}

exports.error = function(message = "") {
    createNewAlert("danger", message);
}

import AppDispatcher from '../dispatchers/AppDispatcher';

/**
 * Display a new toast, for the ToastStore
 *
 * @param {string} type (toast type)
 * @param {string} message (the message to display in the toast)
 */
function createNewToast(type, message) {
    // do nothing if there is no message
    if (!message) return;

    AppDispatcher.dispatch({
        type: 'NEW_TOAST',
        toast: {type, message}
    });
}

exports.success = function(message) {
    createNewToast("success", message);
}

exports.info = function(message) {
    createNewToast("info", message);
}

exports.error = function(message = "") {
    createNewToast("danger", message);
}

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

const success = function(message) {
    createNewToast("success", message);
}

const info = function(message) {
    createNewToast("info", message);
}

const error = function(message = "") {
    createNewToast("danger", message);
}

export {success, info, error}

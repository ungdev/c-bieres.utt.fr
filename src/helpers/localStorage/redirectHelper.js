const KEY_NAME = 'last_action';

export default {

    /**
     * Set the registration
     *
     * @param string action: the last action
     */
    set(action) {
        localStorage.setItem(KEY_NAME, action);
    },

    /**
     * Get the event
     *
     * @return string
     */
    get() {
        return localStorage.getItem(KEY_NAME);
    }

}

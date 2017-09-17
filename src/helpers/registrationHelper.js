const KEY_NAME = 'registration';

export default {

    /**
     * Set the registration
     *
     * @param string id: the event id
     */
    set(id) {
        localStorage.setItem(KEY_NAME, id);
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

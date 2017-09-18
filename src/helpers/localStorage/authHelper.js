const KEY_NAME = 'access_token';

export default {

    /**
     * Set the access token
     *
     * @param string id: the event id
     */
    set(id) {
        localStorage.setItem(KEY_NAME, id);
    },

    /**
     * Get the access token
     *
     * @return string
     */
    get() {
        return localStorage.getItem(KEY_NAME);
    },

    /**
     * Remove the access token from localStorage
     */
     clean() {
         localStorage.removeItem(KEY_NAME);
     }

}

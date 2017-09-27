const KEY_NAME = 'jwt';

export default {

    /**
     * Set the JWT
     *
     * @param string jwt
     */
    set(jwt) {
        localStorage.setItem(KEY_NAME, jwt);
    },

    /**
     * Get the JWT
     *
     * @return string
     */
    get() {
        return localStorage.getItem(KEY_NAME);
    },

    /**
     * Remove the JWT from localStorage
     */
     clean() {
         localStorage.removeItem(KEY_NAME);
     }

}

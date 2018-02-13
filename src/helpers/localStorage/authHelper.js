import jwtDecode from 'jwt-decode'

const KEY_NAME = 'jwt'
const ACCESS_TOKEN = 'accessToken'

export default {

    /**
     * Set the JWT
     *
     * @param string jwt
     */
    set(jwt) {
      localStorage.setItem(KEY_NAME, jwt)
      console.log("PAYLOAD", jwtDecode(jwt))
      localStorage.setItem(ACCESS_TOKEN, jwtDecode(jwt).accessToken)
    },

    /**
     * Get the JWT
     *
     * @return string
     */
    get() {
      return localStorage.getItem(KEY_NAME)
    },

    /**
     * Get the access token from jwt's payload
     * @return {undefined|string} the access token
     */
    getAccessToken() {
      return localStorage.getItem(ACCESS_TOKEN)
    },

    /**
     * Remove the JWT from localStorage
     */
     clean() {
         localStorage.removeItem(KEY_NAME)
     }

}

import jwtDecode from 'jwt-decode'

const JWT_NAME = 'jwt'
const ACCESS_TOKEN = 'accessToken'

export default {

    /**
     * Set the JWT
     *
     * @param string jwt
     */
    set(jwt) {
      localStorage.setItem(JWT_NAME, jwt)
      localStorage.setItem(ACCESS_TOKEN, jwtDecode(jwt).accessToken)
    },

    /**
     * Get the JWT
     *
     * @return string
     */
    get() {
      return localStorage.getItem(JWT_NAME)
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
         localStorage.removeItem(JWT_NAME)
         localStorage.removeItem(ACCESS_TOKEN)
     }

}

import AppDispatcher from '../dispatchers/AppDispatcher';
import AuthService from '../services/AuthService';
import redirectHelper from '../helpers/localStorage/redirectHelper';

export default {

    /**
     * Use the service to get the oauth redirect link.
     * Then, redirect the user
     */
    redirect(action) {
        redirectHelper.set(action);
        AuthService.getRedirectLink()
             .then(response => window.location.replace(response.data.redirectUri))
             .catch(err => console.log(err));
    },

    callback(authorization_code) {
        return AuthService.sendAuthorizationCode(authorization_code)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'LOGGED',
                    jwt: response.data
                });
            })
            .catch(err => console.log(err));
    }

}

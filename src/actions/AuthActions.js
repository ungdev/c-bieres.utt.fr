import AppDispatcher from '../dispatchers/AppDispatcher';
import AuthService from '../services/AuthService';

export default {

    /**
     * Use the service to get the oauth redirect link.
     * Then, redirect the user
     */
    redirect() {
        AuthService.getRedirectLink()
             .then(response => window.location.replace(response.data.redirectUri))
             .catch(err => console.log(err));
    }

}

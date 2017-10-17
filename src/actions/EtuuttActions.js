import AppDispatcher from '../dispatchers/AppDispatcher';
import EtuuttService from '../services/EtuuttService';
import toastHelper from '../helpers/toastHelper';

export default {

    getMatches(pattern) {
        EtuuttService.getMatches(pattern)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'MATCHES_FETCHED',
                    matches: response.data
                });
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Erreur de communication avec EtuUTT. Essaye de te reconnecter.");
            });
    }

}

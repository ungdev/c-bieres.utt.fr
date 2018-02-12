import AppDispatcher from '../dispatchers/AppDispatcher';
import EtuuttService from '../services/EtuuttService';

export default {

    getMatches(pattern) {
        EtuuttService.getMatches(pattern)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'MATCHES_FETCHED',
                    matches: response.data
                });
            })
            .catch(_ => console.log("Erreur de communication avec EtuUTT. Essaye de te reconnecter."));
    }

}

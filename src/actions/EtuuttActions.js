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
            .catch(err => console.error(err));
    }

}

import AppDispatcher from '../dispatchers/AppDispatcher';
import DrinkerService from '../services/DrinkerService';

export default {

    getDrinkers(filters) {
        DrinkerService.get(filters)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DRINKER_FETCHED',
                    drinkers: response.data
                });
            })
            .catch(err => console.error(err));
    }

}

import AppDispatcher from '../dispatchers/AppDispatcher';
import DrinkerService from '../services/DrinkerService';
import alertHelper from '../helpers/alertHelper';

export default {

    getDrinkers(filters) {
        DrinkerService.get(filters)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DRINKERS_FETCHED',
                    drinkers: response.data
                });
            })
            .catch(err => console.error(err));
    },

    createDrinker(data) {
        DrinkerService.create(data)
            .then(response => {
                alertHelper.success("Participant créé et ajouté à l'évènement");

                AppDispatcher.dispatch({
                    type: 'DRINKER_CREATED',
                    drinker: response.data.drinker,
                    event: response.data.event,
                });
            })
            .catch(err => {
                alertHelper.error("Une erreur est survenue");
                console.error(err)
            });
    }

}

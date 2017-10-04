import AppDispatcher from '../dispatchers/AppDispatcher';
import DrinkerService from '../services/DrinkerService';
import EtuuttService from '../services/EtuuttService';
import toastHelper from '../helpers/toastHelper';

export default {

    getDrinkers(filters) {
        Promise.all([DrinkerService.get(filters), EtuuttService.getMatches(filters.multifield)])
            .then(responses => {
                AppDispatcher.dispatch({
                    type: 'DRINKERS_FETCHED',
                    serverDrinkers: responses[0].data,
                    etuuttDrinkers: responses[1].data.data
                });
            })
            .catch(err => console.error(err));
    },

    createDrinker(data) {
        DrinkerService.create(data)
            .then(response => {
                toastHelper.success("Participant créé et ajouté à l'évènement");

                AppDispatcher.dispatch({
                    type: 'DRINKER_CREATED',
                    drinker: response.data.drinker,
                    event: response.data.event,
                });
            })
            .catch(err => {
                toastHelper.error("Une erreur est survenue");
                console.error(err)
            });
    }

}

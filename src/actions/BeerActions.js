import AppDispatcher from '../dispatchers/AppDispatcher';
import BeerService from '../services/BeerService';
import toastHelper from '../helpers/toastHelper';

export default {

    createBeer(data) {
        BeerService.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'CREATE_BEER',
                    beer: response.data
                });

                toastHelper.success("Bière créée.");
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Erreur lors de la création de la bière.");
            });
    },

    updateBeer(id, data) {
        BeerService.update(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'UPDATE_BEER',
                    beer: response.data
                });

                toastHelper.success("Bière mise à jour.");
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Erreur lors de la mise à jour de la bière.");
            });
    },

    deleteBeer(beer) {
        BeerService.delete(beer._id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DELETE_BEER',
                    beer
                });

                toastHelper.success("Bière supprimée.");
            })
            .catch(err => console.error(err));
    }

}

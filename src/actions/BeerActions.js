import AppDispatcher from '../dispatchers/AppDispatcher';
import BeerService from '../services/BeerService';

export default {

    createBeer(data) {
        BeerService.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'CREATE_BEER',
                    beer: response.data
                });
            })
            .catch(err => console.error(err));
    },

    updateBeer(id, data) {
        BeerService.update(id, data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'UPDATE_BEER',
                    beer: response.data
                });
            })
            .catch(err => console.error(err));
    },

    deleteBeer(id) {
        BeerService.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'DELETE_BEER',
                    id
                });
            })
            .catch(err => console.error(err));
    }

}

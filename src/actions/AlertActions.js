import AppDispatcher from '../dispatchers/AppDispatcher';

export default {

    viewed(id) {
        AppDispatcher.dispatch({
            type: 'ALERT_VIEWED',
            id
        });
    }

}

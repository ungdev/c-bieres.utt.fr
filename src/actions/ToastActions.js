import AppDispatcher from '../dispatchers/AppDispatcher';

export default {

    viewed(id) {
        AppDispatcher.dispatch({
            type: 'TOAST_VIEWED',
            id
        });
    }

}

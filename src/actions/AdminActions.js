import AppDispatcher from '../dispatchers/AppDispatcher';
import AdminService from '../services/AdminService';

export default {

    getAdmins() {
        AdminService.get()
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'ADMINS_FETCHED',
                    admins: response.data
                });
            })
            .catch(err => console.error(err));
    },

    addAdmin(data) {
        AdminService.create(data)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'ADMIN_CREATED',
                    admin: response.data
                });
            })
            .catch(err => console.error(err));
    },

    deleteAdmin(id) {
        AdminService.delete(beer._id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'ADMIN_DELETED',
                    id
                });
            })
            .catch(err => console.error(err));
    }

}

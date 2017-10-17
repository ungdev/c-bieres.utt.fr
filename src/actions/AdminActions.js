import AppDispatcher from '../dispatchers/AppDispatcher';
import AdminService from '../services/AdminService';
import toastHelper from '../helpers/toastHelper';

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

                toastHelper.success("Admin ajouté.");
            })
            .catch(err => {
                console.error(err);
                toastHelper.error("Erreur lors de l'ajout de l'Admin.");
            });
    },

    deleteAdmin(id) {
        AdminService.delete(id)
            .then(response => {
                AppDispatcher.dispatch({
                    type: 'ADMIN_DELETED',
                    id
                });

                toastHelper.success("Admin supprimé.");
            })
            .catch(err => {
                console.error(err);
            });
    }

}

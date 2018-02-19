const initialState = []
let toastCounter = 0

const newToast = (message, type) => {
  return {
    id: toastCounter++,
    message,
    type
  }
}
const newErrorToast = (message) => {
  return newToast(message, 'danger')
}

const toasts = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, {
        id: toastCounter++,
        ...action.toast
      }]
    case "CLEAR_TOAST":
      return state.filter(toast => toast.id != action.id)
    // registration
    case "REGISTER_DRINKER_BY_ID_ERROR":
    case "REGISTER_DRINKER_ERROR":
      return [...state, newErrorToast("Echec lors de l'inscription.")]
    case "UNREGISTER_DRINKER_BY_ID_ERROR":
    case "UNREGISTER_DRINKER_ERROR":
      return [...state, newErrorToast("Erreur lors de la desinscription.")]
    // events
    case "UPDATE_EVENT_ERROR":
      return [...state, newErrorToast("Erreur lors de la mise à jour de l'évènement.")]
    case "CREATE_EVENT_ERROR":
      return [...state, newErrorToast("Erreur lors de la création de l'évènement.")]
    case "DELETE_EVENT_ERROR":
      return [...state, newErrorToast("Erreur lors de la suppression de l'évènement.")]
    case "FETCH_EVENTS_ERROR":
      return [...state, newErrorToast("Erreur lors de la récupération des évènements.")]
    case "FETCH_NEXT_EVENT_ERROR":
      return [...state, newErrorToast("Erreur lors de la récupération du prochain évènement.")]
    // drinkers
    case "ETUUTT_FETCH_DRINKERS_ERROR":
    case "SERVER_FETCH_DRINKERS_ERROR":
      return [...state, newErrorToast("Erreur lors de la récupération d'utilisateurs.")]
    // auth
    case "FETCH_REDIRECT_LINK_ERROR":
      return [...state, newErrorToast("La redirection vers le site étu a échoué.")]
    case "AUTHORIZATION_CODE_ERROR":
      return [...state, newErrorToast("Erreur lors de l'authentificatio: code d'authorisation incorrect.")]
    // admins
    case "FETCH_MATCHES_ERROR":
      return [...state, newErrorToast("Erreur lors de la récupération des correspondances.")]
    case "FETCH_ADMINS_ERROR":
      return [...state, newErrorToast("Erreur lors de la récupération des admins.")]
    case "DELETE_ADMIN_ERROR":
      return [...state, newErrorToast("Erreur lors de la suppression.")]
    case "ADD_ADMIN_ERROR":
      return [...state, newErrorToast("Erreur lors de l'ajout.")]
    default:
      return state
  }
}

export default toasts

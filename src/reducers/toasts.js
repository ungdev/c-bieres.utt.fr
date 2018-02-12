const initialState = []
let toastCounter = 0

const toasts = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return [...state, {
        id: toastCounter++,
        ...action.toast
      }]
    case "CLEAR_TOAST":
      return state.filter(toast => toast.id != action.id)
    default:
      return state
  }
}

export default toasts

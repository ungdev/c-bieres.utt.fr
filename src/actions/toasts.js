export const addToast = (message, type) => {
  return {
    type: "ADD_TOAST",
    toast: {
      message,
      type
    }
  }
}

export const clearToast = (id) => {
  return {
    type: "CLEAR_TOAST",
    id
  }
}

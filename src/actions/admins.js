import AdminService from '../services/AdminService'

export const adminsAreLoading = () => {
  return {
    type: 'ADMINS_ARE_LOADING'
  }
}
export const fetchAdminsError = () => {
  return {
    type: 'FETCH_ADMINS_ERROR'
  }
}
export const fetchAdminsSuccess = (admins) => {
  return {
    type: 'FETCH_ADMINS_SUCCESS',
    admins
  }
}

export const adminBeingDeleted = (id) => {
  return {
    type: 'ADMIN_BEING_DELETED',
    id
  }
}
export const deleteAdminError = (id) => {
  return {
    type: 'DELETE_ADMIN_ERROR',
    id
  }
}
export const deleteAdminSuccess = (id) => {
  return {
    type: 'DELETE_ADMIN_SUCCESS',
    id
  }
}

export const adminBeingAdded = (admin) => {
  return {
    type: 'ADMIN_BEING_ADDED',
    admin
  }
}
export const addAdminError = (admin) => {
  return {
    type: 'ADD_ADMIN_ERROR',
    admin
  }
}
export const addAdminSuccess = (admin) => {
  return {
    type: 'ADD_ADMIN_SUCCESS',
    admin
  }
}

export const addAdmin = (student) => {
  return dispatch => {
    dispatch(adminBeingAdded(student))
    return AdminService.create(student)
      .then(response => response.data)
      .then(admin => dispatch(addAdminSuccess(admin)))
      .catch(() => dispatch(addAdminError()))
  }
}

export const deleteAdmin = (id) => {
  return dispatch => {
    dispatch(adminBeingDeleted(id))
    return AdminService.delete(id)
      .then(_ => dispatch(deleteAdminSuccess(id)))
      .catch(_ => dispatch(deleteAdminError(id)))
  }
}

export const fetchAdmins = () => {
  return dispatch => {
    dispatch(adminsAreLoading())
    return AdminService.get()
      .then(response => response.data)
      .then(admins => dispatch(fetchAdminsSuccess(admins)))
      .catch(() => dispatch(fetchAdminsError()))
  }
}

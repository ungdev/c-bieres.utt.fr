import React from 'react'

import Alert    from './Alert'

const AdminsTable = ({ admins, deleteAdmin }) => (
  <div className="table-responsive">
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Numéro étudiant</th>
          <th>Nom</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {
          admins.map(admin => {
            return  <tr key={admin._id}>
                      <td>{admin.studentId}</td>
                      <td>{`${admin.firstName} ${admin.lastName}`}</td>
                      <td>
                        <div className="btn-group" role="group" aria-label="actions">
                          <button type="button" onClick={_ => deleteAdmin(admin._id)} className="btn btn-danger">
                            Supprimer
                          </button>
                        </div>
                      </td>
                    </tr>
          })
        }
      </tbody>
    </table>
    {
      (admins.length === 0) &&
      <Alert type="info" message={
          <div>Aucun administrateur. Tu peux en ajouter un en cliquant sur <b>ajouter un administrateur</b></div>
      } />
    }
  </div>
)

export default AdminsTable

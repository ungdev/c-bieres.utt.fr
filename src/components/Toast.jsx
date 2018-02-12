import React from 'react'

const Toast = ({ onClick, id, message, type }) => (
  <div className={`toast alert alert-${type} alert-dismissible fade show`} role="alert">
      <button onClick={_ => onClick(id)} type="button" className="close">
          <span aria-hidden="true">&times;</span>
      </button>
      {message}
  </div>
)

export default Toast

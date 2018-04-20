import React from 'react'

const Nav = ({ firstName, logout }) => (
  <nav className='navbar navbar-expand-lg navbar-light fixed-top'>
    <a className="navbar-brand"></a>
    <button className="navbar-toggler navbar-toggler-right">
      <i className="fa fa-bars"></i>
    </button>
    <div className='collapse navbar-collapse'>
      <ul className="navbar-nav mr-auto"></ul>
      {
        firstName
          ? <button onClick={logout} className="btn btn-danger" type="button">
              Me déconnecter
            </button>
          : null
      }
    </div>
  </nav>
)

export default Nav

import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Event        from '../components/dashboard/event/Event';
import UpdateEvent  from '../components/dashboard/event/UpdateEvent';
import ShowEvent    from '../components/dashboard/event/ShowEvent';
import AdminsContainer from '../containers/AdminsContainer'
import Sidebar      from '../components/dashboard/Sidebar';
import SidebarItem  from '../components/dashboard/SidebarItem';

import '../styles/css/dashboard.css';

const Dashboard = ({ logout, location }) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <a className="navbar-brand">HomePage</a>
      <button className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="collapse"
              data-target="#navbarsExampleDefault">
        <span className="navbar-toggler-icon"></span>
      </button>
      <ul className="navbar-nav mr-auto"></ul>
      <button onClick={logout} className="btn btn-dark" type="button">
        <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
        Logout
      </button>
    </nav>
    <div className="container-fluid">
      <div className="row">
        <Sidebar location={location} />
        <main className="col-sm-9 ml-sm-auto col-md-10 pt-3 dashboard-main" role="main">
          <Switch>
            <Route path='/dashboard/event/:id/update' component={UpdateEvent}/>
            <Route path='/dashboard/event/:id' component={ShowEvent}/>
            <Route path='/dashboard/event' component={Event}/>
            <Route path='/dashboard/admin' component={AdminsContainer}/>
          </Switch>
        </main>
      </div>
    </div>
  </div>
)

export default Dashboard

import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'

import EventsContainer from '../containers/EventsContainer'
import UpdateEventContainer from '../containers/UpdateEventContainer'
import EventContainer from '../containers/EventContainer'
import AdminsContainer from '../containers/AdminsContainer'
import Sidebar from './Sidebar'

import '../styles/css/dashboard.css'

const Dashboard = ({ logout, location }) => (
  <div>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand" to="/">HomePage</Link>
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
            <Route path='/dashboard/event/:id/update' component={UpdateEventContainer}/>
            <Route path='/dashboard/event/:id' component={EventContainer}/>
            <Route path='/dashboard/event' component={EventsContainer}/>
            <Route path='/dashboard/admin' component={AdminsContainer}/>
          </Switch>
        </main>
      </div>
    </div>
  </div>
)

export default Dashboard

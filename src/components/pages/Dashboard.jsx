import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import Event from '../dashboard/event/Event.jsx';
import EventUpdate from '../dashboard/event/EventUpdate.jsx';
import Admin from '../dashboard/admin/Admin.jsx';

import '../../../assets/css/dashboard.css';

export default class Dashboard extends React.Component {

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">Administration</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </nav>

                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <Link className="nav-link active" to='/dashboard/event'>Évènements</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to='/dashboard/admin'>Gestion des admins</Link>
                                </li>
                            </ul>
                        </nav>

                        <main className="col-sm-9 ml-sm-auto col-md-10 pt-3 page-content" role="main">
                            <Switch>
                                <Route path='/dashboard/event/:id/update' component={EventUpdate}/>
                                <Route path='/dashboard/event' component={Event}/>
                                <Route path='/dashboard/admin' component={Admin}/>
                            </Switch>
                        </main>

                    </div>
                </div>

            </div>
        );
    }

}

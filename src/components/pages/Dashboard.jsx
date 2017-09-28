import React from 'react';

import { Switch, Route, Link } from 'react-router-dom';
import Event from '../dashboard/event/Event.jsx';
import UpdateEvent from '../dashboard/event/UpdateEvent.jsx';
import ShowEvent from '../dashboard/event/ShowEvent.jsx';
import Admin from '../dashboard/admin/Admin.jsx';
import authHelper from '../../helpers/localStorage/authHelper';

import '../../../assets/css/dashboard.css';

export default class Dashboard extends React.Component {

    constructor() {
        super();

        this.state = {
            activeTab: 'event'
        };

        this._logout = this._logout.bind(this);
    }

    _logout() {
        authHelper.clean();
        this.props.history.push('/');
    }

    _handleNavChange(activeTab) {
        this.setState({ activeTab });
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                    <a className="navbar-brand" href="">Administration</a>
                    <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <ul className="navbar-nav mr-auto"></ul>
                    <button onClick={this._logout} className="btn btn-dark" type="button">
                        <i className="fa fa-sign-out" aria-hidden="true"></i>&nbsp;
                        Logout
                    </button>
                </nav>

                <div className="container-fluid">
                    <div className="row">
                        <nav className="col-sm-3 col-md-2 d-none d-sm-block bg-light sidebar">
                            <ul className="nav nav-pills flex-column">
                                <li className="nav-item">
                                    <Link className={"nav-link " + (this.state.activeTab === "event" && "active")} onClick={_ => this._handleNavChange('event')} to='/dashboard/event'>
                                        <i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;
                                        Évènements
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className={"nav-link " + (this.state.activeTab === "admin" && "active")} onClick={_ => this._handleNavChange('admin')} to='/dashboard/admin'>
                                        <i className="fa fa-lock" aria-hidden="true"></i>&nbsp;
                                        Gestion des admins
                                    </Link>
                                </li>
                            </ul>
                        </nav>

                        <main className="col-sm-9 ml-sm-auto col-md-10 pt-3 page-content" role="main">
                            <Switch>
                                <Route path='/dashboard/event/:id/update' component={UpdateEvent}/>
                                <Route path='/dashboard/event/:id' component={ShowEvent}/>
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

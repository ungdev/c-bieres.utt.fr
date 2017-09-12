import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';

export default class App extends React.Component {

    render() {
        return (
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route path='/dashboard' component={Dashboard}/>
            </Switch>
        );
    }

}

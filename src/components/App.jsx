import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Alert from './Alert.jsx';

import AlertStore from '../stores/AlertStore';
import AlertActions from '../actions/AlertActions';

import '../../assets/css/alert.css';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            alerts: []
        };
    }

    componentDidMount() {
       // listen the store change
       AlertStore.addChangeListener(this._onAlertStoreChange.bind(this));
    }

    componentWillUnmount() {
        AlertStore.removeChangeListener(this._onAlertStoreChange);
    }

    _onAlertStoreChange() {
        this.setState({ alerts: AlertStore.alerts });
    }

    _onAlertView(id) {
        AlertActions.viewed(id);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/dashboard' component={Dashboard}/>
                </Switch>
                <div className="alerts-container">
                    {
                        this.state.alerts.map(alert => <Alert key={alert.id} alert={alert} close={this._onAlertView} />)
                    }
                </div>
            </div>
        );
    }

}

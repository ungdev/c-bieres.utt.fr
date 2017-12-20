import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home         from './pages/Home';
import Dashboard    from './pages/Dashboard';
import OldEvents    from './pages/OldEvents';
import Toast        from './pieces/Toast';

import ToastStore   from '../stores/ToastStore';
import ToastActions from '../actions/ToastActions';

import '../styles/toast.css';
import '../styles/main.css';
import '../styles/font-awesome.min.css';

export default class App extends React.Component {

    constructor() {
        super();

        this.state = {
            toasts: []
        };
    }

    componentDidMount() {
       // listen the store change
       ToastStore.addChangeListener(this._onToastStoreChange.bind(this));
    }

    componentWillUnmount() {
        ToastStore.removeChangeListener(this._onToastStoreChange);
    }

    _onToastStoreChange() {
        this.setState({ toasts: ToastStore.toasts });
    }

    _onToastView(id) {
        ToastActions.viewed(id);
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='/olds' component={OldEvents}/>
                </Switch>
                <div className="toasts-container">
                    {
                        this.state.toasts.map(toast => <Toast key={toast.id} toast={toast} close={this._onToastView} />)
                    }
                </div>
            </div>
        );
    }

}

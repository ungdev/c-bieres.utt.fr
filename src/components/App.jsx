import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home         from '../containers/Home';
import Dashboard    from '../containers/Dashboard';
import OldEvents    from '../containers/OldEvents';
import Toast        from './pieces/Toast';

import ToastStore   from '../stores/ToastStore';
import ToastActions from '../actions/ToastActions';

import '../styles/css/font-awesome.min.css';
import '../styles/css/index.css';

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
                <div className="toasts">
                    {
                        this.state.toasts.map(toast => <Toast key={toast.id} toast={toast} close={this._onToastView} />)
                    }
                </div>
            </div>
        );
    }

}

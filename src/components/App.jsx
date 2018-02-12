import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home         from '../containers/Home';
import Dashboard    from '../containers/Dashboard';
import OldEvents    from '../containers/OldEvents';
import ToastsContainer    from '../containers/ToastsContainer';

import '../styles/css/font-awesome.min.css';
import '../styles/css/index.css';

const App = () => (
  <div>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/dashboard' component={Dashboard}/>
      <Route path='/olds' component={OldEvents}/>
    </Switch>
    <ToastsContainer />
  </div>
)

export default App

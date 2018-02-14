import React from 'react'
import { Route } from 'react-router-dom'

import Home         from '../containers/Home';
import Dashboard    from '../containers/Dashboard';
import OldEventsContainer    from '../containers/OldEventsContainer'
import OldEventContainer    from '../containers/OldEventContainer'
import ToastsContainer    from '../containers/ToastsContainer';

import '../styles/css/font-awesome.min.css';
import '../styles/css/index.css';

const App = () => (
  <div>
    <Route exact path='/' component={Home}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/olds/:id' component={OldEventContainer}/>
    <Route exact path='/olds' component={OldEventsContainer}/>
    <ToastsContainer />
  </div>
)

export default App

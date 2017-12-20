import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';

import App from './components/App.jsx';

console.log(process.env);
console.log(process.env.REACT_APP_SERVER_URI);

ReactDOM.render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('root'))

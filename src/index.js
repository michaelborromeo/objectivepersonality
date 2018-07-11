import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import {BrowserRouter as Router} from 'react-router-dom';

import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router';
import {createBrowserHistory} from 'history'

import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={configureStore(history)}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

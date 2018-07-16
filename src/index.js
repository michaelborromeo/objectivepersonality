import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

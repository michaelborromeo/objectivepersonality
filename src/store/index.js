import {createStore, applyMiddleware} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';

import rootReducer from './reducers';

export default function configureStore(history) {
  return createStore(
    connectRouter(history)(rootReducer),
    applyMiddleware(routerMiddleware(history))
  );
}

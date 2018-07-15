import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import _ from 'lodash';

import App from './components/App';
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

const store = configureStore();

store.subscribe(_.debounce(() => {
  const videoTyping = store.getState().videoTyping;

  localStorage.setItem('videoTyping', JSON.stringify({
    selectedVideoId: videoTyping.selectedVideoId,
    videos: videoTyping.videos,
    videoIds: videoTyping.videoIds
  }));
}, 500));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();

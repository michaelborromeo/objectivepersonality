import {createStore, applyMiddleware} from 'redux';
import _ from 'lodash';

import rootReducer from './reducers';

export default function configureStore() {
  const store = createStore(
    rootReducer,
    applyMiddleware()
  );

  store.subscribe(_.debounce(() => {
    const videoTyping = store.getState().videoTyping;
    const encodedChoiceStates = store.getState().choicesAndTypes.encodedChoiceStates;

    localStorage.setItem('loadedState', JSON.stringify({
      selectedVideoId: videoTyping.selectedVideoId,
      videos: videoTyping.videos,
      videoIds: videoTyping.videoIds,
      encodedChoiceStates
    }));
  }, 500));

  return store;
}

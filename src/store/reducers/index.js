import {combineReducers} from 'redux';
import choicesAndTypes from './choicesAndTypes';
import videoTyping from './videoTyping';

export default combineReducers({
  choicesAndTypes,
  videoTyping
});

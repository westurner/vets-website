import { combineReducers } from 'redux';
import uiState from './uiState/index';
import veteran from './veteran/index';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
  uiState,
  veteran,
  form: formReducer
});

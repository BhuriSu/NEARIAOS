import { combineReducers } from 'redux';
import reducer from './reducer';
import reducerError from './reducer-errors';

export default combineReducers({
  user: reducer,
  error: reducerError,
}); 

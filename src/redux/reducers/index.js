import { combineReducers } from 'redux';
import signUp from './signUpReducer';
import logIn from './logInReducer';

export default combineReducers({
  signUp,
  logIn
});

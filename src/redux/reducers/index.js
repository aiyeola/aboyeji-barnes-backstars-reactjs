import { combineReducers } from 'redux';
import signUp from './signUpReducer';
import logIn from './logInReducer';
import verify from './verifyReducer';
import reVerify from './reverifyReducer';
import authorize from './authorizationReducer';

export default combineReducers({
  signUp,
  logIn,
  verify,
  reVerify,
  authorize
});

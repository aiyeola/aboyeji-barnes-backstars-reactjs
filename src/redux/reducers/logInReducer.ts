import { Reducer } from 'redux';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
} from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';
import { DispatchAction } from '@redux/actions/logInAction';

const initialState: InitialState['logIn'] = {
  isLoggedIn: false,
  message: '',
  error: '',
};

const logInReducer: Reducer<InitialState['logIn'], DispatchAction> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        message: payload.message,
      };
    case SOCIAL_LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        message: payload.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: payload.message,
      };
    case SOCIAL_LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        error: payload.message,
      };
    case LOGIN_RESET:
      return initialState;
    default:
      return state;
  }
};

export default logInReducer;

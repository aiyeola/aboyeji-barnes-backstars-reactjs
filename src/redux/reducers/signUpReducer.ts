import { Reducer } from 'redux';

import {
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGNUP_RESET,
} from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';
import { DispatchAction } from '@redux/actions/signUpAction';

const initialState: InitialState['signUp'] = {
  data: '',
  error: '',
};

const signUpReducer: Reducer<InitialState['signUp'], DispatchAction> = (
  state = initialState,
  action,
) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_UP:
      return {
        ...state,
        data: payload,
        error: '',
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        data: '',
        error: payload,
      };
    case SIGNUP_RESET:
      return initialState;
    default:
      return state;
  }
};

export default signUpReducer;

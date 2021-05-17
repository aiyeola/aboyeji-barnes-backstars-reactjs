import {
  RESET_PASSWORD_SENT,
  RESET_PASSWORD_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';
import { DispatchAction } from '@redux/actions/resetPasswordAction';

const initialState: InitialState['resetPassword'] = {
  message: '',
};

const resetPasswordReducer = (state = initialState, action: DispatchAction) => {
  const { type, message } = action;
  switch (type) {
    case RESET_PASSWORD_SENT:
    case PASSWORD_RESET_SUCCESS:
      return { ...state, message };
    case RESET_PASSWORD_FAIL:
    case PASSWORD_RESET_FAIL:
      return { ...state, message };
    default:
      return state;
  }
};

export default resetPasswordReducer;

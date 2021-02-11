import {
  RESET_PASSWORD_SENT,
  PASSWORD_RESET_SUCCESS,
} from '../actions/actionTypes';

const resetPasswordReducer = (state = { message: '' }, action) => {
  const { type, message } = action;
  switch (type) {
    case RESET_PASSWORD_SENT:
    case PASSWORD_RESET_SUCCESS:
      return { ...state, message };
    default:
      return state;
  }
};

export default resetPasswordReducer;

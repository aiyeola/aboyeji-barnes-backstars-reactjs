import { SIGN_UP, SIGN_UP_ERROR } from '../actions/actionTypes';

const signUpReducer = (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        data: action.userDetails,
        error: null,
      };
    case SIGN_UP_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default signUpReducer;

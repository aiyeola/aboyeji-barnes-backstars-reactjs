import { VERIFY_SUCCESS, VERIFY_ERROR } from '../actions/actionTypes';

const verifyReducer = (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case VERIFY_SUCCESS:
      return {
        ...state,
        data: action.details.message,
        error: null,
      };
    case VERIFY_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
      };
    default:
      return state;
  }
};

export default verifyReducer;

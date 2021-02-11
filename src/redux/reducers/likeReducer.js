import { LIKE_SUCCESS, LIKE_ERROR } from '../actions/actionTypes';

const initialState = {
  status: null,
  message: null,
  error: null,
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIKE_SUCCESS:
      return {
        ...state,
        status: 'like_success',
        message: action.message,
      };
    case LIKE_ERROR:
      return {
        ...state,
        status: 'like_error',
        error: action.error,
      };
    default:
      return state;
  }
};

export default likeReducer;

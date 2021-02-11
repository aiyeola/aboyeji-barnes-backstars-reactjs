import { FEEDBACK_SUCCESS, FEEDBACK_ERROR } from '../actions/actionTypes';

const initialState = {
  status: null,
  message: null,
  error: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        status: 'feedback_success',
        message: action.message,
      };
    case FEEDBACK_ERROR:
      return {
        ...state,
        status: 'feedback_error',
        error: action.error,
      };
    default:
      return state;
  }
};

export default feedbackReducer;

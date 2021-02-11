import { REVERIFY_SUCCESS, REVERIFY_ERROR } from '../actions/actionTypes';

const reverifyReducer = (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case REVERIFY_SUCCESS:
      return {
        ...state,
        data: action.details,
        error: null,
      };
    case REVERIFY_ERROR:
      return {
        ...state,
        data: null,
        error: action.error,
      };

    default:
      return state;
  }
};

export default reverifyReducer;

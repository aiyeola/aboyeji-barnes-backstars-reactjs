import {
  AUTHORIZATION_SUCCESS,
  AUTHORIZATION_ERROR,
} from '../actions/actionTypes';

const authorizationReducer = (state = { user: null, error: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case AUTHORIZATION_SUCCESS:
      return {
        ...state,
        user: payload.user,
        error: null,
      };
    case AUTHORIZATION_ERROR:
      return {
        ...state,
        user: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default authorizationReducer;

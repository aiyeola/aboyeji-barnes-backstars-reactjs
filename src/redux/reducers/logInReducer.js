import { LOGIN_SUCCESS, LOGIN_FAILURE } from '../actions/actionTypes';

const initialState = {
  isloggedIn: false,
  message: null,
  error: null
};

const logInReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isloggedIn: true,
        message: payload.message
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isloggedIn: false,
        error: payload
      };
    default:
      return state;
  }
};

export default logInReducer;

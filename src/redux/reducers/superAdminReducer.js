import { ASSIGN_SUCCESS, ASSIGN_FAILED } from '../actions/actionTypes';

const initialState = {
  userRoles: {},
  error: null
};

const admin = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case ASSIGN_SUCCESS:
      return {
        ...state,
        userRoles: action.payload
      };
    case ASSIGN_FAILED:
      return {
        ...state,
        error: action.error
      };
    default:
      return state;
  }
};

export default admin;

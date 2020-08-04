import {
  FETCH_REQUEST_APPROVALS,
  FETCH_REQUEST_APPROVALS_FAILED
} from '../actions/actionTypes';

const initialState = {
  approvals: {},
  error: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;
  switch (type) {
    case FETCH_REQUEST_APPROVALS:
      return {
        ...state,
        approvals: payload
      };
    case FETCH_REQUEST_APPROVALS_FAILED:
      return {
        ...state,
        error: error
      };
    default:
      return state;
  }
};

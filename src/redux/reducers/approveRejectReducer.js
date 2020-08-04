import {
  APPROVE_REJECT_SUCCESS,
  APPROVE_REJECT_ERROR
} from '../actions/actionTypes';

const approveReject = (state = { data: null, error: null }, action) => {
  const { type, details, error } = action;
  switch (type) {
    case APPROVE_REJECT_SUCCESS:
      return {
        ...state,
        error: null,
        data: details
      };
    case APPROVE_REJECT_ERROR:
      return {
        ...state,
        data: null,
        error: error
      };
    default:
      return state;
  }
};

export default approveReject;

import {
  BOOKING_SUCCESS,
  BOOKING_ERROR,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_ERROR
} from '../actions/actionTypes';

export default (state = { data: null, error: null }, action) => {
  switch (action.type) {
    case BOOKING_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.details
      };
    case BOOKING_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      };
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        error: null,
        data: action.details
      };
    case CANCEL_BOOKING_ERROR:
      return {
        ...state,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
};

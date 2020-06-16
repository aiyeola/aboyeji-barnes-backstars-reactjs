import {
  FETCH_LOCATIONS,
  FETCH_LOCATIONS_ERROR,
  REQUEST_TRIP_SUCCESS,
  REQUEST_TRIP_ERROR,
  FETCH_REQUEST_SUCCESS,
  FETCH_REQUEST_ERROR,
  UPDATE_REQUEST_SUCCESS,
  UPDATE_REQUEST_ERROR,
  DELETE_REQUEST_SUCCESS,
  DELETE_REQUEST_ERROR
} from '../actions/actionTypes';

const initialState = {
  status: '',
  locations: '',
  message: '',
  error: ''
};

export default (state = initialState, action) => {
  const { type, data, error, message, id } = action;
  switch (type) {
    case FETCH_LOCATIONS:
      return { ...state, status: 'fetch_locations_success', locations: data };
    case FETCH_LOCATIONS_ERROR:
      return { ...state, status: 'fetch_locations_error', error };
    case REQUEST_TRIP_SUCCESS:
      return { ...state, status: 'request_success', message, id };
    case REQUEST_TRIP_ERROR:
      return { ...state, status: 'request_error', error };
    case UPDATE_REQUEST_SUCCESS:
      return { ...state, status: 'update_request_success', message, id };
    case UPDATE_REQUEST_ERROR:
      return { ...state, status: 'update_request_error', error, id };
    case FETCH_REQUEST_SUCCESS:
      return { ...state, status: 'fetch_request_success', data };
    case FETCH_REQUEST_ERROR:
      return { ...state, status: 'fetch_request_error', error };
    case DELETE_REQUEST_SUCCESS:
      return { ...state, status: 'delete_request_success', message };
    case DELETE_REQUEST_ERROR:
      return { ...state, status: 'delete_request_error', error };
    default:
      return state;
  }
};

import { SERVER_ERROR, NETWORK_ERROR } from '../actions/actionTypes';

const initialState = {
  status: '',
  message: '',
};

const errorReducer = (state = initialState, action) => {
  const { type, errors } = action;
  switch (type) {
    case NETWORK_ERROR:
      return {
        ...state,
        status: 408,
        message: `Can't connect to Server`,
      };
    case SERVER_ERROR:
      return {
        ...state,
        status: errors.status || 500,
        message: errors.message || errors.errors,
      };
    default:
      return state;
  }
};

export default errorReducer;

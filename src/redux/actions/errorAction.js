import { SERVER_ERROR, NETWORK_ERROR } from './actionTypes';

export const networkError = (error) => ({
  type: NETWORK_ERROR,
  errors: error
});

export const serverError = (error) => ({
  type: SERVER_ERROR,
  errors: error.data
});

export const handleError = (error) => (dispatch) => {
  return error.response
    ? dispatch(serverError(error.response))
    : dispatch(networkError(error));
};

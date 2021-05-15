import { Action, Dispatch } from 'redux';

import { SERVER_ERROR, NETWORK_ERROR } from '@redux/actions/actionTypes';
import { InitialState } from '@redux/InitialState';

export interface DispatchAction extends Action {
  type: string;
  errors: Partial<InitialState['errors']>;
}

export const networkError = (error: InitialState['errors']) => ({
  type: NETWORK_ERROR,
  errors: error,
});

export const serverError = (error: InitialState['errors']) => ({
  type: SERVER_ERROR,
  errors: error,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleError = (error: any) => (dispatch: Dispatch) => {
  return error.response
    ? dispatch(serverError(error))
    : dispatch(networkError(error));
};

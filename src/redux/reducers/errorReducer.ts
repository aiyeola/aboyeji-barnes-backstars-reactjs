import { Reducer } from 'redux';

import {
  SERVER_ERROR,
  NETWORK_ERROR,
  ERROR_RESET,
} from '@redux/actions/actionTypes';
import { DispatchAction } from '@redux/actions/errorAction';
import { InitialState } from '@redux/InitialState';

const initialState: InitialState['errors'] = {
  status: '',
  message: '',
};

const errorReducer: Reducer<InitialState['errors'], DispatchAction> = (
  state = initialState,
  action,
) => {
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
        message: errors.message,
      };
    case ERROR_RESET:
      return initialState;
    default:
      return state;
  }
};

export default errorReducer;

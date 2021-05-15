import axios from 'axios';
import { Action, Dispatch } from 'redux';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_RESET,
  SOCIAL_LOGIN_SUCCESS,
  SOCIAL_LOGIN_FAILURE,
} from '@redux/actions/actionTypes';
import { BASE_URL } from 'src/config';
import { InitialState } from '@redux/InitialState';
import { serverError } from '@redux/actions/errorAction';

export interface DispatchAction extends Action {
  type: string;
  payload: Partial<InitialState['logIn']>;
}

type User = {
  userEmail: string;
  userPassword: string;
};

type DecodedPayload = {
  data: string;
  message: string;
  status: number;
};

export const loginSuccess = (
  payload: InitialState['logIn'],
): DispatchAction => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (
  payload: InitialState['logIn'],
): DispatchAction => ({
  type: LOGIN_FAILURE,
  payload,
});

export const localAuth =
  (payload: User) =>
  async (dispatch: Dispatch): Promise<void> => {
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, payload);
      localStorage.setItem('barnesToken', res.data.data.userToken);
      dispatch(loginSuccess(res.data));
    } catch (error) {
      if (error.response) {
        dispatch(loginFailure(error.response.data));
      } else {
        dispatch(serverError(error));
      }
    }
  };

export const socialAuth = (payload: DecodedPayload) => (dispatch: Dispatch) => {
  if (payload.status === 200) {
    localStorage.setItem('barnesToken', payload.data);
    dispatch({
      type: SOCIAL_LOGIN_SUCCESS,
      payload,
    });
  } else {
    dispatch({
      type: SOCIAL_LOGIN_FAILURE,
      payload,
    });
  }
};

export const resetLoginState = () => (dispatch: Dispatch) =>
  dispatch({
    type: LOGIN_RESET,
  });

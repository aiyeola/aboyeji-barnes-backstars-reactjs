import axios from 'axios';
import { Action, Dispatch } from 'redux';

import {
  RESET_PASSWORD_SENT,
  RESET_PASSWORD_FAIL,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_FAIL,
} from '@redux/actions/actionTypes';
import { BASE_URL } from 'src/config';
import { serverError } from '@redux/actions/errorAction';
import { InitialState } from '@redux/InitialState';

export interface DispatchAction extends Action {
  type: string;
  message: InitialState['resetPassword'];
}

type Data = {
  password: string;
  newPassword: string;
  userId: string | string[] | undefined;
  userToken: string | string[] | undefined;
};

export const resetPasswordSent = (
  response: InitialState['resetPassword'],
): DispatchAction => ({
  type: RESET_PASSWORD_SENT,
  message: response,
});

export const resetPasswordFail = (
  response: InitialState['resetPassword'],
): DispatchAction => ({
  type: RESET_PASSWORD_FAIL,
  message: response,
});

export const passwordResetSuccess = (
  response: InitialState['resetPassword'],
): DispatchAction => ({
  type: PASSWORD_RESET_SUCCESS,
  message: response,
});

export const passwordResetFail = (
  response: InitialState['resetPassword'],
): DispatchAction => ({
  type: PASSWORD_RESET_FAIL,
  message: response,
});

export const sendResetPasswordAction =
  (email: string) => async (dispatch: Dispatch) => {
    const url = `${BASE_URL}/api/v1/auth/forgot-password`;
    try {
      const response = await axios.post(url, { email });
      console.log('response: ', response.data);
      dispatch(resetPasswordSent(response.data.message));
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 404:
            dispatch(resetPasswordFail(error.response.data.message));
            break;
          default:
            break;
        }
      }
      dispatch(serverError(error));
    }
  };

export const resetPasswordAction =
  (data: Data) => async (dispatch: Dispatch) => {
    const { userId, userToken, password, newPassword } = data;
    const url = `${BASE_URL}/api/v1/auth/reset-password/${userId}/${userToken}`;
    try {
      const response = await axios.put(url, { password, newPassword });
      dispatch(passwordResetSuccess(response.data.message));
    } catch (error) {
      if (error.response) {
        switch (error.response.status) {
          case 400:
            dispatch(passwordResetFail(error.response.data.errors));
            break;
          default:
            break;
        }
      }
      dispatch(serverError(error));
    }
  };

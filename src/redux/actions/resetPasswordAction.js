import { RESET_PASSWORD_SENT, PASSWORD_RESET_SUCCESS } from './actionTypes';
import { BASE_URL } from '../../config';
import axios from 'axios';
import { handleError } from './errorAction';

export const resetPasswordSent = (response) => ({
  type: RESET_PASSWORD_SENT,
  message: response.message,
});

export const passwordResetSuccess = (response) => ({
  type: PASSWORD_RESET_SUCCESS,
  message: response,
});

export const sendResetPassword = (email) => async (dispatch) => {
  const url = `${BASE_URL}/api/v1/auth/forgot-password`;
  try {
    const response = await axios.post(url, email);
    dispatch(resetPasswordSent(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const resetPassword = (data) => async (dispatch) => {
  const { userId, userToken, password, newPassword } = data;
  const url = `${BASE_URL}/api/v1/auth/reset-password/${userId}/${userToken}`;
  try {
    const response = await axios.put(url, { password, newPassword });
    dispatch(passwordResetSuccess(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

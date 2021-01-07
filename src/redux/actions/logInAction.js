import axios from 'axios';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import { BASE_URL } from '../../config';

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});

export const localAuth = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`${BASE_URL}/api/v1/auth/signin`, payload);
    localStorage.setItem('barnesToken', res.data.data.userToken);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response) {
      dispatch(loginFailure(error.response.data.message));
    } else {
      dispatch(loginFailure('Network Error'));
    }
  }
};

export const socialAuth = (payload) => (dispatch) => {
  if (payload.status === 200) {
    localStorage.setItem('barnesToken', payload.data);
    dispatch(loginSuccess(payload));
  } else {
    dispatch(loginFailure(payload.error));
  }
};

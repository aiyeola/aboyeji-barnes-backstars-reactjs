import { toast } from 'react-toastify';
import { LOGIN_SUCCESS, LOGIN_FAILURE } from './actionTypes';
import API from '../../config/axiosInstance';

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload
});

export const localAuth = (payload) => async (dispatch) => {
  try {
    const res = await API.post('/api/v1/auth/signin', payload);
    localStorage.setItem('barnesToken', res.data.data);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    if (error.response) {
      toast.error(error.response.data.message);
      dispatch(loginFailure(error.response.data.message));
    } else {
      toast.error('Network Error');
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

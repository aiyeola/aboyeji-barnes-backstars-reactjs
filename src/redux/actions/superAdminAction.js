import axios from 'axios';
import { toast } from 'react-toastify';
import { ASSIGN_SUCCESS, ASSIGN_FAILED } from './actionTypes';
import { BASE_URL, config } from '../../config';

export const postSuccess = (payload) => ({
  type: ASSIGN_SUCCESS,
  payload
});

export const postFailed = (error) => ({
  type: ASSIGN_FAILED,
  error
});

export const assignUser = (userInfo) => async (dispatch) => {
  const url = `${BASE_URL}/api/v1/auth/update-role`;
  try {
    const response = await axios.put(url, userInfo, config);
    const { data } = response;
    toast.success(data.message);
    dispatch(postSuccess(data));
  } catch (error) {
    let { response: err } = error;
    if (err === undefined) {
      err = {
        data: {
          message: error.message
        }
      };
    }
    toast.error(
      err.data.status === 401 ? 'You were logged out' : err.data.message
    );
    dispatch(postFailed(err.data));
  }
};

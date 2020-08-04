import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_REQUEST_APPROVALS,
  FETCH_REQUEST_APPROVALS_FAILED
} from './actionTypes';
import { BASE_URL, config } from '../../config';

const fetchSuccess = (payload) => ({
  type: FETCH_REQUEST_APPROVALS,
  payload
});

const fetchFails = (error) => ({
  type: FETCH_REQUEST_APPROVALS_FAILED,
  error
});

export const fetchRequestApprovals = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/requests/pending`,
      config
    );
    const { data } = response;
    toast.success(data.message);
    dispatch(fetchSuccess(data));
  } catch (error) {
    let err = error.response;
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
    dispatch(fetchFails(err.data));
  }
};

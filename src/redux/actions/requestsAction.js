import axios from 'axios';
import { toast } from 'react-toastify';
import {
  FETCH_REQUESTS,
  FETCH_REQUESTS_FAILED,
  FETCH_PENDING,
  FETCH_PAST
} from './actionTypes';
import { BASE_URL, config } from '../../config';

const fetchSuccess = (payload) => ({
  type: FETCH_REQUESTS,
  payload
});

const fetchFail = (error) => ({
  type: FETCH_REQUESTS_FAILED,
  error
});

export const fetchRequests = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/requests/my-requests`,
      config
    );
    const { data } = response;
    dispatch(fetchSuccess({ data, title: 'ALL REQUESTS' }));
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
    dispatch(fetchFail(err.data));
  }
};

export const searchRequests = (parameter, query) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/v1/search/requests?${parameter}=${query}`,
      config
    );
    dispatch(fetchSuccess({ data: res.data }));
  } catch (error) {
    console.log('error: ', error);
    let err = error.response;
    if (err === undefined) {
      err = {
        data: {
          message: error.message
        }
      };
    }
    dispatch(fetchFail(err.data));
  }
};

export const getPending = () => ({
  type: FETCH_PENDING,
  payload: {
    title: 'PENDING REQUESTS'
  }
});

export const getPast = () => ({
  type: FETCH_PAST,
  payload: {
    title: 'PAST REQUESTS'
  }
});

import axios from 'axios';
import { toast } from 'react-toastify';
import {
  GET_COMMENTS,
  GET_COMMENTS_FAILED,
  POST_COMMENTS,
  POST_COMMENTS_FAILED,
  DELETE_COMMENTS,
  DELETE_COMMENTS_FAILED
} from './actionTypes';
import { BASE_URL, config } from '../../config';

const Success = (payload, actionType) => ({
  type: actionType,
  payload
});

const Fail = (error, actionType) => ({
  type: actionType,
  error
});

export const getComment = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/requests/${id}/comments`,
      config
    );
    const { data } = response;
    dispatch(Success(data, GET_COMMENTS));
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
    dispatch(Fail(err.data, GET_COMMENTS_FAILED));
  }
};

export const postComment = (id, comment) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/requests/${id}/comment`,
      comment,
      config
    );
    const { data } = response;
    toast.success(data.message);
    data.data.User = data.data.user;
    delete data.data.user;
    dispatch(Success(data, POST_COMMENTS));
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
    dispatch(Fail(err.data, POST_COMMENTS_FAILED));
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/api/v1/requests/comments/${id}`,
      config
    );
    const { data } = response;
    toast.success(data.message);
    const newData = { ...data, id };
    dispatch(Success(newData, DELETE_COMMENTS));
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
    dispatch(Fail(err.data, DELETE_COMMENTS_FAILED));
  }
};

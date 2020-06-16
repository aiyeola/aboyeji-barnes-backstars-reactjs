import axios from 'axios';
import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR
} from './actionTypes';
import { BASE_URL, config } from '../../config';

const profileUrl = `${BASE_URL}/api/v1/profile`;
const profilePictureUrl = `${BASE_URL}/api/v1/profile/picture`;

export const getProfile = () => async (dispatch) => {
  try {
    const response = await axios.get(profileUrl, config);
    const picture = await axios.get(profilePictureUrl, config);
    if (response.data.data.userProfile === null) {
      response.data.data.userProfile = {};
    }

    Object.keys(response.data.data.userProfile).forEach((key) => {
      if (response.data.data.userProfile[key] === 'null') {
        response.data.data.userProfile[key] = '';
      }
    });

    const payload = { ...response.data.data, image: picture.data.data };

    dispatch({
      type: GET_PROFILE,
      data: payload
    });
  } catch (error) {
    dispatch({
      type: GET_PROFILE_ERROR,
      error: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const updateProfile = (data) => async (dispatch) => {
  Object.keys(data).forEach((key) => {
    if (!data[key]) {
      delete data[key];
    }
  });
  try {
    const response = await axios.patch(profileUrl, data, config);
    const picture = await axios.get(profilePictureUrl, config);
    if (response.data.data.userProfile === null) {
      response.data.data.userProfile = {};
    }

    Object.keys(response.data.data.userProfile).forEach((key) => {
      if (response.data.data.userProfile[key] === 'null') {
        response.data.data.userProfile[key] = '';
      }
    });

    const payload = { ...response.data.data, image: picture.data.data };

    dispatch({
      type: UPDATE_PROFILE,
      data: payload
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      error: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const updateProfilePicture = (data) => async (dispatch) => {
  try {
    const response = await axios.get(profileUrl, config);
    const picture = await axios.patch(profilePictureUrl, data, config);

    const payload = { ...response.data.data, image: picture.data.data };

    dispatch({
      type: UPDATE_PROFILE,
      data: payload,
      error: ''
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      data: {},
      error: error.response ? error.response.data.message : 'Server error'
    });
  }
};

import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from './actionTypes';
import { BASE_URL, config } from '../../config';
import axios from 'axios';

const checkUser = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/auth/check-user`, config);
    dispatch({
      type: AUTHORIZATION_SUCCESS,
      payload: {
        user: res.data.data
      }
    });
  } catch (error) {
    dispatch({
      type: AUTHORIZATION_ERROR,
      payload: error.response
        ? error.response.data
        : { status: 500, message: 'Server Error' }
    });
  }
};

export default checkUser;

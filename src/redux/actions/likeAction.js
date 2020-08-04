import { LIKE_SUCCESS, LIKE_ERROR } from './actionTypes';
import axios from 'axios';
import { BASE_URL, config } from '../../config';

const likeAction = (accommodationId) => async (dispatch) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/api/v1/accommodations/${accommodationId}/like`,
      {},
      config
    );
    dispatch({
      type: LIKE_SUCCESS,
      message: response.data.message
    });
  } catch (error) {
    dispatch({
      type: LIKE_ERROR,
      error: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export default likeAction;

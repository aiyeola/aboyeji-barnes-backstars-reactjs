import { FEEDBACK_SUCCESS, FEEDBACK_ERROR } from './actionTypes';
import axios from 'axios';
import { BASE_URL, config } from '../../config';

const feedbackAction = (accommodationId, feedback) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/accommodations/${accommodationId}/feedback`,
      feedback,
      config
    );
    dispatch({
      type: FEEDBACK_SUCCESS,
      message: response.data.message
    });
  } catch (error) {
    dispatch({
      type: FEEDBACK_ERROR,
      error: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export default feedbackAction;

import axios from 'axios';
import { GET_ROOMS_SUCCESS, GET_ROOMS_ERROR } from './actionTypes';
import { BASE_URL, config } from '../../config';

const getRooms = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/rooms`, config);
    dispatch({
      type: GET_ROOMS_SUCCESS,
      payload: {
        data: res.data.data
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ROOMS_ERROR,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export default getRooms;

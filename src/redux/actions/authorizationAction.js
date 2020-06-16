import { AUTHORIZATION_SUCCESS, AUTHORIZATION_ERROR } from './actionTypes';
import * as userAPI from '../../API/userApi';

const checkUser = () => async (dispatch) => {
  try {
    const res = await userAPI.checkUser();
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

import { VERIFY_SUCCESS, VERIFY_ERROR } from './actionTypes';
import * as userAPI from '../../API/userApi';

const verifyAction = (token) => async (dispatch) => {
  try {
    const data = await userAPI.verify(token);
    switch (data.status) {
      case 201:
        dispatch({
          type: VERIFY_SUCCESS,
          details: {
            status: 201,
            message: data.data.data
          }
        });
        break;
      case 401:
        dispatch({
          type: VERIFY_ERROR,
          error: {
            status: 401,
            message: 'Verification link expired'
          }
        });
        break;
      case 409:
        dispatch({
          type: VERIFY_ERROR,
          error: {
            status: 409,
            message: 'User already verified'
          }
        });
        break;
      default:
        dispatch({
          type: VERIFY_ERROR,
          error: {
            status: 500,
            message: 'Server Error'
          }
        });
    }
  } catch (error) {
    dispatch({
      type: VERIFY_ERROR,
      error: {
        status: 501,
        message: 'Connection Error'
      }
    });
  }
};

export default verifyAction;

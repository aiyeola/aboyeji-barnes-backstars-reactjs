import { REVERIFY_SUCCESS, REVERIFY_ERROR } from './actionTypes';
import * as userAPI from '../../API/userApi';

const reverifyAction = (userEmail) => async (dispatch) => {
  try {
    const data = await userAPI.reverify(userEmail);
    switch (data.status) {
      case 200:
        dispatch({
          type: REVERIFY_SUCCESS,
          details: {
            status: 200,
            message: userEmail
          }
        });
        break;
      default:
        dispatch({
          type: REVERIFY_ERROR,
          error: {
            status: data.status,
            message: data.message
          }
        });
    }
  } catch (error) {
    dispatch({
      type: REVERIFY_ERROR,
      error: {
        status: 501,
        message: 'Connection Error'
      }
    });
  }
};

export default reverifyAction;

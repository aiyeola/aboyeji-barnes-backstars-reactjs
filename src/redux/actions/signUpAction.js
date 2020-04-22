import { SIGN_UP, SIGN_UP_ERROR } from './actionTypes';
import * as userApi from '../../API/userApi';

const signUpAction = ({
  firstName,
  lastName,
  userEmail,
  userPassword
}) => async (dispatch) => {
  try {
    const data = await userApi.signUp({
      firstName,
      lastName,
      userEmail,
      userPassword
    });
    switch (data.status) {
      case 201:
        dispatch({
          type: SIGN_UP,
          userDetails: data.data.data
        });
        break;
      default:
        dispatch({
          type: SIGN_UP_ERROR,
          error: {
            status: data.status,
            message: data.message
          }
        });
    }
  } catch (error) {
    dispatch({
      type: SIGN_UP_ERROR,
      error: {
        status: 501,
        message: 'Connection error'
      }
    });
  }
};

export default signUpAction;

import { Action, Dispatch } from 'redux';

import {
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGNUP_RESET,
} from '@redux/actions/actionTypes';
import * as userApi from '@api/userApi';

export interface DispatchAction extends Action {
  type: string;
  payload: string;
}

export type UserDetails = {
  firstName: string;
  lastName: string;
  userEmail: string;
  userPassword: string;
};

const signUpAction =
  ({ firstName, lastName, userEmail, userPassword }: UserDetails) =>
  async (dispatch: Dispatch) => {
    try {
      const data = await userApi.signUp({
        firstName,
        lastName,
        userEmail,
        userPassword,
      });
      switch (data.status) {
        case 201:
          dispatch({
            type: SIGN_UP,
            payload: data.data.message,
          });
          break;
        default:
          dispatch({
            type: SIGN_UP_ERROR,
            payload: data.message,
          });
      }
    } catch (error) {
      dispatch({
        type: SIGN_UP_ERROR,
        payload: 'Network Error',
      });
    }
  };

export default signUpAction;

export const resetSignupState = () => (dispatch: Dispatch) =>
  dispatch({
    type: SIGNUP_RESET,
  });

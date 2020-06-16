import { combineReducers } from 'redux';
import signUp from './signUpReducer';
import logIn from './logInReducer';
import verify from './verifyReducer';
import reVerify from './reverifyReducer';
import authorize from './authorizationReducer';
import errors from './errorReducer';
import resetPassword from './resetPasswordReducer';
import admin from './superAdminReducer';
import supplier from './addSupplierReducer';
import accommodations from './accommodationsReducer';
import accommodation from './accommodationReducer';
import request from './requestReducer';
import addAccommodation from './addAccommodationReducer';
import rating from './rateAccommodationReducer';
import like from './likeReducer';
import feedback from './feedbackReducer';
import profile from './profileReducer';
import requests from './requestsReducer';

export default combineReducers({
  signUp,
  logIn,
  verify,
  reVerify,
  authorize,
  errors,
  resetPassword,
  admin,
  supplier,
  accommodations,
  accommodation,
  request,
  addAccommodation,
  rating,
  like,
  feedback,
  profile,
  requests
});

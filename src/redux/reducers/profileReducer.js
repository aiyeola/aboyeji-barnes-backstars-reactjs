import moment from 'moment';
import {
  GET_PROFILE,
  GET_PROFILE_ERROR,
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR
} from '../actions/actionTypes';

const initialState = {
  status: '',
  data: {
    passportName: '',
    passportNumber: '',
    firstName: '',
    lastName: '',
    birthDate: '',
    department: '',
    phoneNumber: '',
    language: '',
    currency: '',
    gender: '',
    location: '',
    image: '',
    userId: '',
    role: ''
  },
  error: ''
};

export default (state = initialState, action) => {
  const { type, data, error } = action;
  switch (type) {
    case GET_PROFILE:
      return {
        ...state,
        status: 'fetch_success',
        data: {
          image: data.image
            ? data.image.url
            : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png',
          passportName: data.userProfile && data.userProfile.passportName,
          passportNumber: data.userProfile && data.userProfile.passportNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          requestAutofill: data.requestAutofill,
          birthDate: data.userProfile
            ? moment(data.userProfile.birthDate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
          department: data.userProfile && data.userProfile.department,
          phoneNumber: data.userProfile && data.userProfile.phoneNumber,
          language: data.userProfile && data.userProfile.language,
          currency: data.userProfile && data.userProfile.currency,
          gender: data.userProfile && data.userProfile.gender,
          location: data.userProfile && data.userProfile.location,
          userId: data.userProfile && data.userProfile.userId,
          role: data.userRoles
        }
      };
    case GET_PROFILE_ERROR:
      return { ...state, status: 'fetch_error', error };
    case UPDATE_PROFILE:
      return {
        ...state,
        status: 'update_success',
        data: {
          image: data.image
            ? data.image.url
            : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png',
          passportName: data.userProfile && data.userProfile.passportName,
          passportNumber: data.userProfile && data.userProfile.passportNumber,
          firstName: data.firstName,
          lastName: data.lastName,
          requestAutofill: data.requestAutofill,
          birthDate: data.userProfile
            ? moment(data.userProfile.birthDate).format('YYYY-MM-DD')
            : moment().format('YYYY-MM-DD'),
          department: data.userProfile && data.userProfile.department,
          phoneNumber: data.userProfile && data.userProfile.phoneNumber,
          language: data.userProfile && data.userProfile.language,
          currency: data.userProfile && data.userProfile.currency,
          gender: data.userProfile && data.userProfile.gender,
          location: data.userProfile && data.userProfile.location
        }
      };
    case UPDATE_PROFILE_ERROR:
      return { ...state, status: 'update_error', error };
    default:
      return state;
  }
};

import {
  GET_ACCOMMODATION_SUCCESS,
  GET_ACCOMMODATION_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  accommodation: '',
  error: null,
};

const accommodationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommodation: payload,
        error: '',
      };
    case GET_ACCOMMODATION_FAILURE:
      return {
        ...state,
        accommodation: '',
        error: payload,
      };
    default:
      return state;
  }
};

export default accommodationReducer;

import {
  ADD_ACCOMMODATION_SUCCESS,
  ADD_ACCOMMODATION_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  accommodation: null,
  error: '',
};

const addAccommodationReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ACCOMMODATION_SUCCESS:
      return {
        ...state,
        accommodation: payload.data,
        error: '',
      };
    case ADD_ACCOMMODATION_FAILURE:
      return {
        ...state,
        accommodation: null,
        error: payload,
      };
    default:
      return state;
  }
};

export default addAccommodationReducer;

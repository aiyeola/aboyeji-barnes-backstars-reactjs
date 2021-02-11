import { GET_ROOMS_SUCCESS, GET_ROOMS_ERROR } from '../actions/actionTypes';

const initialState = {
  data: [],
  error: null,
};

const roomsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ROOMS_SUCCESS:
      return {
        ...state,
        data: payload.data,
        error: null,
      };
    case GET_ROOMS_ERROR:
      return {
        ...state,
        data: [],
        error: payload,
      };
    default:
      return state;
  }
};

export default roomsReducer;

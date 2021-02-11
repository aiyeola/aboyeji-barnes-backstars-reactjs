import {
  ADD_SUPPLIER_SUCCESS,
  ADD_SUPPLIER_ERROR,
} from '../actions/actionTypes';

const addSupplierReducer = (state = { data: null, error: null }, action) => {
  const { type, details, error } = action;
  switch (type) {
    case ADD_SUPPLIER_SUCCESS:
      return {
        ...state,
        data: details,
      };
    case ADD_SUPPLIER_ERROR:
      return {
        ...state,
        error: error,
      };
    default:
      return state;
  }
};

export default addSupplierReducer;

import { ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_ERROR } from './actionTypes';
import addSupplier from '../../API/superAdminApi';

const addSupplierAction = ({ userEmail, firstName, lastName }) => async (
  dispatch
) => {
  try {
    const data = await addSupplier({ userEmail, firstName, lastName });
    switch (data.status) {
      case 201:
        dispatch({
          type: ADD_SUPPLIER_SUCCESS,
          details: { status: 201, message: 'Supplier added successfully' }
        });
        break;
      default:
        dispatch({
          type: ADD_SUPPLIER_ERROR,
          error: { status: data.status || 500, message: data.message }
        });
    }
  } catch (error) {
    dispatch({
      type: ADD_SUPPLIER_ERROR,
      details: { status: 501, message: 'Connection error. Try again' }
    });
  }
};

export default addSupplierAction;

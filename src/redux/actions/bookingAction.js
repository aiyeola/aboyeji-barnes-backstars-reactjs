import {
  BOOKING_SUCCESS,
  BOOKING_ERROR,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_ERROR
} from './actionTypes';
import { bookRoomApi, cancelBooking } from '../../API/bookingApi';

export const bookRoom = (bookDetails, requestId) => async (dispatch) => {
  // book details is an array of booking details according to whether single trip or multi city.
  try {
    const data = await bookRoomApi({ bookDetails, requestId });
    switch (data.status) {
      case 200:
        dispatch({
          type: BOOKING_SUCCESS,
          details: { status: 200, message: data.data.message }
        });
        break;
      default:
        dispatch({
          type: BOOKING_ERROR,
          error: { status: data.status || 500, message: data.message }
        });
    }
  } catch (error) {
    dispatch({
      type: BOOKING_ERROR,
      details: { status: 501, message: 'connection error. Try again' }
    });
  }
};

export const cancelBookingAction = (requestId) => async (dispatch) => {
  try {
    const data = await cancelBooking(requestId);
    switch (data.status) {
      case 200:
        dispatch({
          type: CANCEL_BOOKING_SUCCESS,
          details: { status: 201, message: 'Booking cancelled successfully' }
        });
        break;
      default:
        dispatch({
          type: CANCEL_BOOKING_ERROR,
          error: { status: data.status || 500, message: data.message }
        });
    }
  } catch (error) {
    dispatch({
      type: CANCEL_BOOKING_ERROR,
      details: { status: 501, message: 'connection error. Try again' }
    });
  }
};

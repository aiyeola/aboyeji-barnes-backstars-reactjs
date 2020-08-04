import axios from 'axios';
import { BASE_URL, config } from '../config';

export const bookRoomApi = async ({ bookDetails, requestId }) => {
  // action can be approve or reject
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/booking/${requestId}`,
      { booking: bookDetails },
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const cancelBooking = async (requestId) => {
  // action can be approve or reject
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/booking/cancel/${requestId}`,
      {},
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

import axios from 'axios';
import { BASE_URL, config } from '../config';

export const approveReject = async (action, requestId, reason) => {
  // action can be approve or reject
  try {
    const data = await axios.patch(
      `${BASE_URL}/api/v1/requests/${action}/${requestId}`,
      {
        reason
      },
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getRequest = async (requestId) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/api/v1/requests/${requestId}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

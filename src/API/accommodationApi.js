import axios from 'axios';
import { BASE_URL, config } from '../config';

export const getAccommodations = async () => {
  try {
    const data = axios.get(`${BASE_URL}/api/v1/accommodations`, config);
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const getAccommodation = async (id) => {
  try {
    const data = await axios.get(
      `${BASE_URL}/api/v1/accommodations/${id}`,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const createAccommodation = async (payload) => {
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/accommodations`,
      payload,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const createRooms = async (payload) => {
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/accommodations/rooms`,
      payload,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

export const rateAccommodation = async (value, id) => {
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/accommodations/${id}/ratings`,
      value,
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};

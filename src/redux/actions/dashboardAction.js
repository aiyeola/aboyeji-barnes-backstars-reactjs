import axios from 'axios';
import { LOAD_MOST_TRAVELLED, GET_TRIPS_BY_PERIOD } from './actionTypes';
import { handleError } from './errorAction';
import { BASE_URL, config } from '../../config';

export const getMostTravelledSuccess = (payload) => ({
  type: LOAD_MOST_TRAVELLED,
  payload
});

export const getTripsByPeriod = (payload) => ({
  type: GET_TRIPS_BY_PERIOD,
  payload
});

export const getMostTravelled = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/accommodations/most-travelled-destination`,
      config
    );
    dispatch(getMostTravelledSuccess(response.data.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getTrips = (period) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/requests/trip-stats`,
      period,
      config
    );
    dispatch(getTripsByPeriod(response.data.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

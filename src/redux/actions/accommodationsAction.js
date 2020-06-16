import {
  GET_ACCOMMODATIONS_SUCCESS,
  GET_ACCOMMODATIONS_FAILURE,
  GET_ACCOMMODATION_SUCCESS,
  GET_ACCOMMODATION_FAILURE,
  ADD_ACCOMMODATION_SUCCESS,
  ADD_ACCOMMODATION_FAILURE,
  ADD_ROOMS_SUCCESS,
  ADD_ROOMS_FAILURE,
  RATE_ACCOMMODATION_SUCCESS,
  RATE_ACCOMMODATION_FAILED
} from './actionTypes';
import { toast } from 'react-toastify';
import * as accommodationApi from '../../API/accommodationApi';

export const getAccommodations = (user) => async (dispatch) => {
  try {
    const response = await accommodationApi.getAccommodations();
    dispatch({
      type: GET_ACCOMMODATIONS_SUCCESS,
      payload: {
        accommodations: response.data.data,
        user
      }
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOMMODATIONS_FAILURE,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const getAccommodation = (id) => async (dispatch) => {
  try {
    const response = await accommodationApi.getAccommodation(id);
    dispatch({
      type: GET_ACCOMMODATION_SUCCESS,
      payload: response.data.data
    });
  } catch (error) {
    dispatch({
      type: GET_ACCOMMODATION_FAILURE,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const createAccommodation = (payload) => async (dispatch) => {
  try {
    const response = await accommodationApi.createAccommodation(payload);
    dispatch({
      type: ADD_ACCOMMODATION_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_ACCOMMODATION_FAILURE,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const createRooms = (payload) => async (dispatch) => {
  try {
    const response = await accommodationApi.createRooms(payload);
    dispatch({
      type: ADD_ROOMS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ADD_ROOMS_FAILURE,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

export const rateAccommodation = (value, id) => async (dispatch) => {
  try {
    const response = await accommodationApi.rateAccommodation(value, id);
    toast.success(response.data.message);
    dispatch({ type: RATE_ACCOMMODATION_SUCCESS, payload: response.data });
  } catch (error) {
    toast.error(error.response ? error.response.data.message : 'Server error');
    dispatch({
      type: RATE_ACCOMMODATION_FAILED,
      payload: error.response ? error.response.data.message : 'Server error'
    });
  }
};

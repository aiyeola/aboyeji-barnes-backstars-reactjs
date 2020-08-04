import axios from 'axios';
import { BASE_URL, config } from '../../config';
import {
  NOTIFICATION_GET,
  NOTIFICATION_UPDATE,
  NOTIFICATION_READALL,
  NOTIFICATION_READONE
} from './actionTypes';
import { handleError } from './errorAction';

export const loadNotificationSuccess = (response) => ({
  type: NOTIFICATION_GET,
  data: response.data
});

export const updateNotificationSuccess = (data) => ({
  type: NOTIFICATION_UPDATE,
  data
});

export const markReadAllSuccess = () => ({
  type: NOTIFICATION_READALL
});

export const markOneReadSuccess = (notificationId) => ({
  type: NOTIFICATION_READONE,
  data: notificationId
});

export const getNotifications = () => async (dispatch) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/api/v1/notifications`,
      config
    );
    dispatch(loadNotificationSuccess(response));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const markReadAll = () => async (dispatch) => {
  try {
    await axios.patch(
      `${BASE_URL}/api/v1/notifications/mark-as-read`,
      null,
      config
    );
    dispatch(markReadAllSuccess());
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const markOneAsRead = (notificationId) => async (dispatch) => {
  try {
    await axios.patch(
      `${BASE_URL}/api/v1/notifications/mark-as-read?id=${notificationId}`,
      null,
      config
    );
    dispatch(markOneReadSuccess(notificationId));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateNotification = (data) => async (dispatch) => {
  dispatch(updateNotificationSuccess(data));
};

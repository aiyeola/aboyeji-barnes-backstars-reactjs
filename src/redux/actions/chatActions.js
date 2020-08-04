import axios from 'axios';
import { GET_CHATS, SEND_MESSAGE, GET_NEW_MESSAGES } from './actionTypes';
import { BASE_URL, config } from '../../config';
import { handleError } from './errorAction';

export const loadChatSuccess = (response) => ({
  type: GET_CHATS,
  data: response.data
});

export const sendMessageSuccess = (response) => ({
  type: SEND_MESSAGE,
  data: response.data
});

export const updateChatMessageSuccess = (response) => ({
  type: GET_NEW_MESSAGES,
  data: response.data
});

export const sendMessage = (message) => async (dispatch) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/api/v1/chat`,
      message,
      config
    );
    dispatch(sendMessageSuccess(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const getChats = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/v1/chat`, config);
    dispatch(loadChatSuccess(response.data));
  } catch (error) {
    dispatch(handleError(error));
  }
};

export const updateChatMessages = (data) => async (dispatch) => {
  dispatch(updateChatMessageSuccess({ data }));
};

import initialState from './initialState';
import {
  NOTIFICATION_UPDATE,
  NOTIFICATION_GET,
  NOTIFICATION_READALL,
  NOTIFICATION_READONE,
} from '../actions/actionTypes';

const notificationReducer = (state = initialState.notifications, actions) => {
  const { notifications } = state;
  const { type, data } = actions;
  switch (type) {
    case NOTIFICATION_GET:
      return {
        ...state,
        notifications: data.data.notifications,
        unread: data.data.unread,
      };
    case NOTIFICATION_UPDATE:
      const updatedUnread = state.unread + 1;
      const newArray = [data].concat(notifications);
      return {
        ...state,
        unread: updatedUnread,
        notifications: newArray,
      };
    case NOTIFICATION_READONE:
      const updatedNotifications = notifications.map((notification) => {
        if (notification.id === parseInt(data, 10)) {
          notification.read = true;
          return notification;
        }
        return notification;
      });
      const unread = state.unread - 1;
      return {
        ...state,
        unread,
        notifications: updatedNotifications,
      };
    case NOTIFICATION_READALL:
      return {
        ...state,
        ...initialState.notifications,
      };
    default:
      return state;
  }
};

export default notificationReducer;

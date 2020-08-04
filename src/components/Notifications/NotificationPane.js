import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import io from 'socket.io-client';
import { BASE_URL } from '../../config';
import {
  getNotifications,
  updateNotification,
  markReadAll,
  markOneAsRead
} from '../../redux/actions/notificationActions';
import placeholder from '../../assets/pic.png';

// const socket = io.connect(BASE_URL);

const NotificationPane = ({
  userId,
  notifications,
  getNotifications,
  updateNotification,
  markReadAll,
  markOneAsRead,
  handlePane,
  classes
}) => {
  useEffect(() => {
    getNotifications();

    // socket.on('created', (data) => {
    //   if (data.userId === userId) {
    //     updateNotification(data);
    //   }
    // });
  }, [getNotifications, userId, updateNotification]);

  const handleReadAll = () => {
    markReadAll();
  };

  const handleReadOne = ({ target }) => {
    const { read, id, request, type, notification } = target.dataset;
    read === 'false' && markOneAsRead(id);
    handlePane();
    if (type === 'comment' && notification.search('The manager') === -1) {
      window.location.href = `/approvals/${request}`;
    } else {
      window.location.href = `/request/${request}`;
    }
  };

  return (
    <div id="notifications-container" className={classes}>
      <div id="myModal" className="modal">
        <div className="modal-content effect1">
          <div className="modal-body">
            {notifications &&
              notifications.map((notification) => (
                <div
                  className={`item ${!notification.read && 'unread'}`}
                  key={notification.id}
                >
                  <span className="image">
                    <img src={placeholder} alt="placeholder" />
                  </span>
                  <div
                    role="presentation"
                    id={`not${notification.id}`}
                    onClick={handleReadOne}
                    className="content"
                  >
                    <span
                      className="details"
                      data-id={`${notification.id}`}
                      data-read={`${notification.read}`}
                      data-request={`${notification.requestId}`}
                      data-notification={`${notification.notification}`}
                      data-type={`${notification.type}`}
                    >
                      {notification.notification}
                    </span>
                    <span
                      className="date"
                      data-id={`${notification.id}`}
                      data-read={`${notification.read}`}
                      data-request={`${notification.requestId}`}
                    >
                      {moment(notification.createdAt).fromNow()}
                    </span>
                  </div>
                </div>
              ))}
            {notifications.length === 0 && (
              <div className="item">
                <span className="content">
                  <p>No New Notifications</p>
                </span>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="notification-btn"
              type="button"
              id="read-all"
              onClick={handleReadAll}
            >
              <span>Mark all as read</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ notification }) => {
  return {
    unread: notification.unread,
    notifications: notification.notifications
  };
};

NotificationPane.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  updateNotification: PropTypes.func.isRequired,
  markReadAll: PropTypes.func.isRequired,
  markOneAsRead: PropTypes.func.isRequired,
  handlePane: PropTypes.func.isRequired,
  notifications: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired
};

export default connect(mapStateToProps, {
  getNotifications,
  updateNotification,
  markReadAll,
  markOneAsRead
})(NotificationPane);

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Badge from '@material-ui/core/Badge';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNotifications } from '../../redux/actions/notificationActions';
// import placeholder from "../../assets/pic.png";

const Notifications = ({ getNotifications, classes, handlePane, unread }) => {
  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div>
      <Badge
        className={classes.margin}
        id="noti-icon"
        badgeContent={unread}
        onClick={handlePane}
        color="secondary"
      >
        <NotificationsIcon
          name="notification"
          className={classes.iconHover}
          onClick={handlePane}
        />
      </Badge>
    </div>
  );
};

const mapStateToProps = ({ profile, notification }) => ({
  profile,
  unread: notification.unread
});

Notifications.propTypes = {
  getNotifications: PropTypes.func.isRequired,
  handlePane: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  unread: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { getNotifications })(Notifications);

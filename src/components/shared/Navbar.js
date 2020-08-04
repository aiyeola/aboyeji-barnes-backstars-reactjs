/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Menu from '@material-ui/icons/Menu';
import MenuOpen from '@material-ui/icons/MenuOpen';
import ChatIcon from '@material-ui/icons/Chat';
import useStyles from './iconStyles';
import MenuCreator from '../../helpers/menuCreator';
import ProfileMenu from './ProfileMenu';
import Notifications from '../Notifications';
import NotificationPane from '../Notifications/NotificationPane';
import ManageChatPane from '../Chat';
import MenuPane from './Menu';
import { getProfile } from '../../redux/actions/profileActions';

export const Navbar = ({ history, location, role, id }) => {
  const classes = useStyles();
  const [showPane, setShowPane] = useState('hide');
  const [showChat, setShowChat] = useState('hide');
  const [showProfilePane, setShowProfilePane] = useState('hide');
  const [showMenuPane, setShowMenuPane] = useState('hide');
  const profilePicture = useSelector((state) => state.profile).data.image;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  const togglePane = () => {
    if (showPane === 'hide') {
      setShowChat('hide');
      setShowProfilePane('hide');
      setShowMenuPane('hide');
      setShowPane('notification show');
    } else {
      setShowPane('hide');
    }
  };

  const toggleChat = () => {
    if (showChat === 'hide') {
      setShowPane('hide');
      setShowProfilePane('hide');
      setShowMenuPane('hide');
      setShowChat('show');
    } else {
      setShowChat('hide');
    }
  };

  const toggleMenuPane = () => {
    if (showProfilePane === 'hide') {
      setShowChat('hide');
      setShowMenuPane('hide');
      setShowPane('hide');
      setShowProfilePane('profile-menu-pane showProfileMenu');
    } else {
      setShowProfilePane('hide');
    }
  };

  const toggleMenu = () => {
    if (showMenuPane === 'hide') {
      setShowChat('hide');
      setShowPane('hide');
      setShowProfilePane('hide');
      setShowMenuPane('menu-pane showMenu');
    } else {
      setShowMenuPane('hide');
    }
  };

  window.onclick = (event) => {
    const paneClass = event.target.className;
    if (paneClass === 'notification show') {
      setShowPane('hide');
    }
    if (paneClass === 'profile-menu-pane showProfileMenu') {
      setShowProfilePane('hide');
    }
    if (paneClass === 'menu-pane showMenu') {
      setShowMenuPane('hide');
    }
  };

  const { menu, menuMobile } = MenuCreator(location, Link, role);

  return (
    <>
      <nav className="navbar">
        <a className="navbar-brand" href="/dashboard">
          <img
            alt="Barnes-Backstars Logo"
            src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
            className="navbar-brand"
          />
        </a>
        <ul className="menu-items">{menu}</ul>
        <ul>
          <li className="root menu-icon">
            {showMenuPane === 'hide' ? (
              <Menu classes={classes} onClick={toggleMenu} />
            ) : (
              <MenuOpen classes={classes} onClick={toggleMenu} />
            )}
          </li>
          <li className="root">
            <Notifications classes={classes} handlePane={togglePane} />
          </li>
          <li className="root">
            <ChatIcon className={classes.iconHover} onClick={toggleChat} />
          </li>
          <li className="root profile-menu" onClick={toggleMenuPane}>
            <img
              src={profilePicture}
              className="m-right-1 profile-picture"
              alt="Profile"
              height="23"
              width="23"
              onClick={toggleMenuPane}
            />
            <i
              className={`caret fas ${
                showProfilePane === 'hide' ? 'fa-caret-down' : 'fa-caret-up'
              }`}
              onClick={toggleMenuPane}
            />
          </li>
        </ul>
      </nav>
      <NotificationPane
        userId={id}
        classes={showPane}
        handlePane={togglePane}
        history={history}
      />
      <ProfileMenu
        classes={showProfilePane}
        handlePane={toggleMenuPane}
        history={history}
      />
      <ManageChatPane classes={showChat} toggleChat={toggleChat} />
      <MenuPane
        classes={showMenuPane}
        handlePane={toggleMenu}
        history={history}
        menu={menuMobile}
      />
    </>
  );
};

export default withRouter(Navbar);

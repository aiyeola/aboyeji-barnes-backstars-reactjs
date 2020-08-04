import React from 'react';

const ProfileMenu = ({ handlePane, history, classes }) => {
  const goToProfile = () => {
    history.push('/profile');
    handlePane();
  };

  const handleLogout = () => {
    localStorage.removeItem('barnesToken');
    window.location.href = '/log-in';
    handlePane();
  };

  return (
    <div className={classes}>
      <div id="myModal" className="modal-profile-menu">
        <div className="modal-content effect1">
          <div className="modal-body">
            <div
              id="go-to-profile"
              className="profile-menu-item"
              onClick={goToProfile}
            >
              My Profile
            </div>
            <div
              id="log-out"
              className="profile-menu-item"
              onClick={handleLogout}
            >
              Log Out
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMenu;

import React from 'react';

const SettingsCard = ({ title, children, handleSubmit, classes }) => (
  <>
    <div className="settings">
      <h3 className="title">{title}</h3>
      <div>
        <form className={`${classes}`} onSubmit={handleSubmit}>
          {children}
        </form>
      </div>
    </div>
  </>
);

export default SettingsCard;

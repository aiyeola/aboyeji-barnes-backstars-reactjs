import React from 'react';
import Meta from './shared/Meta';

const ServerErrorPage = () => (
  <>
    <Meta title="Server Error" />
    <div className="c4v-container">
      <div className="c4v">
        <img
          src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
          className="barnes-backstars-logo"
          alt="Barnes-Backstars Logo"
        />
        <div className="call4verify-container">
          <h3 className="c4v-title">SERVER ERROR</h3>
          <div className="m-bottom-1" />
          <h1 className="error-num">500</h1>
          <div className="m-bottom-1" />
          <p>Problem Occurred Try Again OR Check Your Internet Connection</p>
        </div>
      </div>
    </div>
  </>
);

export default ServerErrorPage;

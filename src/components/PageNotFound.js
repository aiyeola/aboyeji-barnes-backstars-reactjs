import React from 'react';
import Meta from './shared/Meta';

const PageNotFound = () => (
  <>
    <Meta title="Page Not Found" />
    <div className="c4v-container">
      <div className="c4v">
        <img
          className="barnes-backstars-logo"
          src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
          alt="Barnes-Backstars Logo"
        />
        <div className="call4verify-container">
          <h3 className="c4v-title">Page Not Found</h3>
          <div className="m-bottom-1" />
          <h1 className="error-num">404</h1>
          <div className="m-bottom-1" />
        </div>
      </div>
    </div>
  </>
);

export default PageNotFound;

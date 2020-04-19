import React from 'react';
import Meta from './shared/Meta';

function ServerErrorPage() {
  return (
    <div>
      <Meta title="500 | Server Error" />
      <h3>SERVER ERROR</h3>
      <h1>500</h1>
      <p>Problem Occurred Try Again OR Check Your Internet Connection</p>
    </div>
  );
}

export default ServerErrorPage;

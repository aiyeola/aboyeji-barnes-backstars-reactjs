import React from 'react';
import Facebook from '../../logo/iconfinder_square-facebook_317727.png';
import Google from '../../logo/iconfinder_Google_1298745.png';
import { baseUrl } from '../../config';

const SocialAuth = () => (
  <>
    <div className="social-btn">
      <a
        className="btn btn-primary google"
        href={`${baseUrl}/api/v1/auth/google`}
      >
        <span className="icon">
          <img src={Google} alt="logo" />
        </span>
        <span>Continue with Google</span>
      </a>
    </div>
    <div className="social-btn">
      <a
        className="btn btn-primary fb"
        href={`${baseUrl}/api/v1/auth/facebook`}
      >
        <span>
          <img src={Facebook} alt="logo" />
        </span>
        <span>Continue with Facebook</span>
      </a>
    </div>
  </>
);

export default SocialAuth;

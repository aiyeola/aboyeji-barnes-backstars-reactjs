import React from 'react';
import Facebook from '../../logo/iconfinder_square-facebook_317727.png';
import Google from '../../logo/iconfinder_Google_1298745.png';
import { baseUrl } from '../../config';

const SocialAuth = () => (
  <>
    <div className="social-btn">
      <a className="btn btn-google" href={`${baseUrl}/api/v1/auth/google`}>
        <span>
          <img src={Google} alt="logo" />
        </span>
      </a>
    </div>
    <div className="social-btn">
      <a className="btn btn-fb" href={`${baseUrl}/api/v1/auth/facebook`}>
        <span>
          <img src={Facebook} alt="logo" />
        </span>
      </a>
    </div>
  </>
);

export default SocialAuth;

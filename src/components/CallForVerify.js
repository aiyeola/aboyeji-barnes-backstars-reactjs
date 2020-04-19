/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const CallForVerify = ({ history }) => {
  useEffect(() => {
    const token = localStorage.getItem('barnesToken');
    if (token) {
      history.push('/dashboard');
    }
  });

  return (
    <>
      <div className="c4v-container">
        <div className="c4v">
          <img
            alt="Barnes-Backstars Logo"
            className="barnes-backstars-logo"
            src=""
          />
          <div className="call4verify-container">
            <h4 className="c4v-title">Please verify your email</h4>
            <p>
              An email has been sent to your inbox with a link to verify your
              account. If you have not received the email after a few minutes,
              please check your spam folder.
            </p>
            <p className="notice-exp">
              <i className="fa fa-exclamation-triangle" />
              The verification link is valid for 24 hours.
            </p>
            <Link to="/login" className="verify-ok">
              <button className="btn btn-primary" type="button">
                Ok
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallForVerify;

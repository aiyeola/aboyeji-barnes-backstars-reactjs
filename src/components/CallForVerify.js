import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Meta from './shared/Meta';

const CallForVerify = ({ history }) => {
  useEffect(() => {
    const token = localStorage.getItem('barnesToken');
    return token ? history.push('/dashboard') : undefined;
  });

  return (
    <>
      <Meta title="Verify your account" />
      <div className="c4v-container">
        <Container className="c4v">
          <img
            alt="Barnes-Backstars Logo"
            className="barnes-backstars-logo"
            src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
          />
          <div className="call4verify-container">
            <h2 className="c4v-title">Please verify your email</h2>
            <p>
              An email has been sent to your inbox with a link to verify your
              account. If you have not received the email after a few minutes,
              please check your spam folder.
            </p>
            <p className="notice-exp">
              <i className="fa fa-exclamation-triangle" />
              The verification link is valid for 24 hours.
            </p>
            <div className="m-bottom-1" />
            <Link to="/log-in" className="verify-ok">
              <button className="btn btn-primary">Ok</button>
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
};

CallForVerify.propTypes = {
  history: PropTypes.object.isRequired
};

export default CallForVerify;

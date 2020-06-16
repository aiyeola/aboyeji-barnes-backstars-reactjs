/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import Meta from '../shared/Meta';
import validator from '../../helpers/validator';
import {
  sendResetPassword,
  resetPassword
} from '../../redux/actions/resetPasswordAction';
import {
  ResetFormTemplate,
  PasswordResetFormTemplate,
  ResetEmailSentTemplate
} from './ResetPasswordForm';

const ResetPasswordPage = ({
  sendResetPassword,
  resetPassword,
  userId,
  userToken,
  errors,
  history
}) => {
  if (localStorage.getItem('barnesToken')) {
    history.push('/dashboard');
  }
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [emailSent, setEmailSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [validationErrors, setErrors] = useState({
    email: undefined,
    password: undefined,
    match: undefined
  });

  useEffect(() => {
    redirect();
  }, [errors]);

  const handleChange = async ({ target }) => {
    const { error } = await validator(target.name, target.value);
    switch (target.name) {
      case 'email':
        setEmail(target.value);
        break;
      case 'password':
        setPassword(target.value);
        setErrors({ ...validationErrors, password: error });
        break;
      case 'newPassword':
        setErrors({
          ...validationErrors,
          match: undefined
        });
        setNewPassword(target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formName = event.target.name;
    const hasErrors = Object.values(validationErrors).some(
      (val) => val !== undefined
    );
    if (formName === 'emailForm') {
      if (email !== undefined && email.length > 5) {
        setSubmitting(true);
        sendResetPassword({ email });
      }
    }
    if (formName === 'passwordForm') {
      if (!hasErrors && password === newPassword) {
        setSubmitting(true);
        resetPassword({ password, newPassword, userId, userToken });
      } else {
        setErrors({
          ...validationErrors,
          match: 'Passwords do not match'
        });
      }
    }
  };

  const redirect = () => {
    if (userId === undefined) {
      if (email !== undefined && errors.message === '') {
        setEmailSent(true);
        toast.success('Reset Password Link Sent');
      } else if (email !== undefined && errors.message !== '') {
        toast.error(errors.message);
      }
    }

    if (password !== undefined && errors.message === '') {
      toast.success('Password Reset Successfully');
      history.push('/');
    } else if (password !== undefined && errors.message !== '') {
      toast.error(errors.message);
    }
  };

  return (
    <div className="login-container">
      <div className="local bg">
        <img
          className="barnes-backstars-logo"
          src="https://res.cloudinary.com/aboyeji-barnes-backstars/image/upload/v1588818157/aboyeji-barnes-backstars/Barnes_2_cpqaef.jpg"
          alt="Barnes Backstars logo"
        />
        {userId === undefined ? (
          !emailSent ? (
            <>
              <Meta title="Forgot Password" />
              <ResetFormTemplate
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                submitting={submitting}
              />
            </>
          ) : (
            <ResetEmailSentTemplate email={email} />
          )
        ) : (
          <>
            <Meta title="Reset Password" />
            <PasswordResetFormTemplate
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              error={validationErrors}
              submitting={submitting}
            />
          </>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ errors }, ownProps) => {
  const { match } = ownProps;
  const userId = match ? match.params.userId : undefined;
  const userToken = match ? match.params.userToken : undefined;
  return {
    userId,
    userToken,
    errors
  };
};

export default connect(mapStateToProps, { sendResetPassword, resetPassword })(
  ResetPasswordPage
);

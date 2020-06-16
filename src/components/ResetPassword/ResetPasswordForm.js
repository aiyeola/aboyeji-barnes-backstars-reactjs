import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../shared/Input';
import Button from '../shared/Button';

export const ResetFormTemplate = ({
  handleChange,
  handleSubmit,
  submitting
}) => (
  <form onSubmit={handleSubmit} name="emailForm" className="login-form">
    <label htmlFor="email">
      <p className="foot-message">
        In order to reset password please provide an email linked to your Barnes
        Backstars account below
      </p>
      <div className="m-bottom-2" />
      <Input
        name="email"
        inputType="email"
        placeholder="Email Address"
        onChange={handleChange}
        required={{ required: 'required' }}
      />
    </label>
    <Button
      buttonId="reset-password"
      buttonType="submit"
      text="Reset Password"
      classes="btn btn-primary"
      submitting={submitting}
    />
  </form>
);

export const ResetEmailSentTemplate = ({ email }) => (
  <div>
    <p className="foot-message">
      Kindly check your <strong>{email}</strong> for password reset information
    </p>
    <Link to="/log-in">
      <Button buttonId="log-in" classes="btn btn-primary" text="LOG IN" />
    </Link>
  </div>
);

export const ResetEmailComplete = () => (
  <div>
    <p className="password-reset-paragraph">Password reset successfully</p>
  </div>
);

export const PasswordResetFormTemplate = ({
  handleSubmit,
  handleChange,
  error,
  submitting
}) => (
  <form onSubmit={handleSubmit} name="passwordForm">
    <div className="m-bottom-2" />
    <Input
      name="password"
      inputType="password"
      placeholder="Enter password"
      onChange={handleChange}
      error={error.password}
      required={{ required: 'required' }}
    />
    <Input
      name="newPassword"
      inputType="password"
      placeholder="Confirm Password"
      onChange={handleChange}
      error={error.match}
      required={{ required: 'required' }}
    />
    <Button
      buttonId="submit-password"
      buttonType="submit"
      text="Submit"
      submitting={submitting}
      classes="btn btn-primary"
    />
  </form>
);

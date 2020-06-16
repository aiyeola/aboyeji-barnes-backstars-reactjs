/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = ({
  buttonId,
  buttonType,
  classes,
  text,
  onClick,
  submitting
}) => {
  const newClasses = submitting ? `${classes} btn-disabled` : classes;
  return (
    <button
      id={buttonId}
      type={buttonType}
      className={newClasses}
      onClick={onClick}
    >
      {submitting ? 'Submitting' : text}{' '}
      {submitting ? <FontAwesomeIcon icon={faSpinner} spin /> : ''}
    </button>
  );
};

Button.defaultProps = {
  buttonType: 'button',
  submitting: false
};

Button.propTypes = {
  buttonId: PropTypes.string.isRequired,
  buttonType: PropTypes.string,
  classes: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  onClick: PropTypes.func,
  submitting: PropTypes.bool
};

export default Button;

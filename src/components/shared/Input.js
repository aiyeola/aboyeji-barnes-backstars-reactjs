/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-expressions */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  name,
  inputType,
  classes,
  placeholder,
  onChange,
  value,
  disabled,
  unique,
  max,
  min,
  required,
  error
}) => {
  // error ? `${classes} error-field ` : classes;
  let newClasses;
  if (error) {
    if (classes.includes('input')) {
      newClasses = `${classes}form-error error-field `;
    }
    if (`${classes} input-old`) {
      newClasses = `${classes} error-field-old `;
    }
  } else {
    newClasses = classes;
  }
  // const formErrorClass =
  //   ? 'form-error error-field-old'
  //   : 'form-error';
  return (
    <>
      <input
        name={name}
        id={name}
        type={inputType}
        className={newClasses}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        disabled={disabled}
        unique={unique}
        max={max}
        min={min}
        autoComplete="off"
        {...required}
      />
      <label htmlFor={name} className="popup-label">
        {`${classes} input-old` ? null : placeholder}
      </label>
      <p className="form-error">{error}</p>
    </>
  );
};

Input.defaultProps = {
  inputType: 'text',
  classes: 'input',
  placeholder: '',
  disabled: '',
  unique: '',
  max: '',
  min: '',
  error: ''
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  inputType: PropTypes.string,
  classes: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  value: PropTypes.string,
  disabled: PropTypes.string,
  unique: PropTypes.string,
  max: PropTypes.string,
  min: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  required: PropTypes.object,
  error: PropTypes.string
};

export default Input;

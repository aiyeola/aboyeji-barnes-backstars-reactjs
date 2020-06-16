import React from 'react';
import PropTypes from 'prop-types';

const Select = ({
  name,
  classes,
  onChange,
  unique,
  value,
  disabled,
  error,
  options,
  ids
}) => {
  const message = options.length > 1 ? 'Select One ..' : 'None Available ';
  const data = options.map((element, index) => (
    <option
      value={ids.length > 0 && index > 0 ? ids[index] : element}
      key={index}
    >
      {element || message}
    </option>
  ));
  return (
    <>
      <select
        name={name}
        className={classes}
        value={value}
        onChange={onChange}
        unique={unique}
        disabled={disabled}
      >
        {data}
      </select>
      {error ? <p className="form-error">{error}</p> : ''}
      <br />
    </>
  );
};

Select.defaultProps = {
  error: '',
  ids: [],
  classes: 'input',
  disabled: '',
  unique: ''
};

Select.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  ids: PropTypes.array,
  classes: PropTypes.string,
  disabled: PropTypes.string,
  unique: PropTypes.string
};

export default Select;

import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Spinner = () => (
  <div className="spinner">
    <FontAwesomeIcon className="icon" icon={faSpinner} spin />
  </div>
);

export default Spinner;

import React from 'react';
import PropTypes from 'prop-types';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TooltipComponent({ passportName }) {
  return (
    <div className="tooltip">
      <FontAwesomeIcon icon={faUserCircle} size="2x" />
      <span className="tooltiptext">{passportName}</span>
    </div>
  );
}

TooltipComponent.propTypes = {
  passportName: PropTypes.string.isRequired
};

export default TooltipComponent;

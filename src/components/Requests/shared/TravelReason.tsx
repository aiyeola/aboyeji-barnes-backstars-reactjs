import React from 'react';
import PropTypes from 'prop-types';

const TravelReason = ({ classes, reason }) => {
  const element = document.createElement('div');
  element.innerHTML = reason;
  return (
    <div className={`travel-reacon-container ${classes}`}>
      <div className="title-reason">Travel Reason:</div>
      <div className="trv-reason">
        <div
          className="main-reason"
          dangerouslySetInnerHTML={{ __html: reason }}
        />
      </div>
    </div>
  );
};

TravelReason.propTypes = {
  classes: PropTypes.string.isRequired,
  reason: PropTypes.element.isRequired,
};

export default TravelReason;

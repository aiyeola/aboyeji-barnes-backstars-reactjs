import React from 'react';
import PropTypes from 'prop-types';

const ViewServices = ({ amenities, services }) => (
  <>
    <div>
      <h4 className="amenities">Amenities</h4>
      <ol>{handleDisplay(amenities)}</ol>
    </div>
    <div className="services">
      <h4>Services</h4>
      <ol>{handleDisplay(services)}</ol>
    </div>
  </>
);

const handleDisplay = (values) => {
  let items = [];
  for (let i = 0; i < values.length; i++) {
    items.push(<li key={`${values[i]} - ${i}`}>{values[i]}</li>);
    if (i === 1) {
      break;
    }
  }
  return items;
};

ViewServices.propTypes = {
  amenities: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired
};

export default ViewServices;

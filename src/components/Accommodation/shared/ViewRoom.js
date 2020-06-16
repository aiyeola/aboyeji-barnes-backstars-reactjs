import React from 'react';
import PropTypes from 'prop-types';

export default function ViewRoom({ name, type, price, classes }) {
  return (
    <div className="one_card room-card">
      <div className={classes[0]} />
      <div className={`room-info ${classes[1]}`}>
        <h4>Name</h4>
        <p>{name}</p>
        <h4>Type</h4>
        <p>{type}</p>
        <h4>Price</h4>
        <p>{price}USD/night</p>
      </div>
    </div>
  );
}

ViewRoom.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  classes: PropTypes.array.isRequired
};

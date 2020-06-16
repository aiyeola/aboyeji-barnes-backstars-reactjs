import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../shared/Button';

export default function Modal({ amenities, services, closeModal }) {
  return (
    <div className="modal-container">
      <section className="main-modal services-modal">
        <Button
          buttonType="button"
          classes="btn btn-secondary"
          text="Close"
          onClick={closeModal}
        />
        <br />
        <h3>Amenities:</h3>
        {amenities.map((amenity, index) => (
          <p key={index}>{amenity}</p>
        ))}
        <h3>Services:</h3>
        {services.map((service, index) => (
          <p key={index}>{service}</p>
        ))}
      </section>
    </div>
  );
}

Modal.propTypes = {
  amenities: PropTypes.array.isRequired,
  services: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired
};

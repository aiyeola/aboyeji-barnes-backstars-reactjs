import React from 'react';
import PropTypes from 'prop-types';
import Button from '../../shared/Button';

const Modal = ({ closeModal, confirm, children }) => {
  return (
    <div className="modal-container">
      <section className="main-modal">
        {children}
        <br />
        <Button
          buttonType="button"
          classes="btn btn-secondary"
          text="Close"
          onClick={closeModal}
        />
        <Button
          buttonType="button"
          classes="btn btn-danger"
          text="Confirm"
          onClick={confirm}
        />
      </section>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired
};

export default Modal;

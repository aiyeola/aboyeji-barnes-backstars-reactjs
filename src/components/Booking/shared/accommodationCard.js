import React from 'react';
import PropTypes from 'prop-types';

const AccommodationCard = ({ id, name, url, handleImageClick }) => {
  return (
    <div className="acc-card col-3" onClick={() => handleImageClick(id, name)}>
      <img
        src={
          url
            ? url[0]
            : 'https://res.cloudinary.com/drayzii/image/upload/v1573796111/no-image-found-360x260_xvpnuj.png'
        }
        alt="Accommodation"
      />
      <p>
        <a
          href={`/accommodation/${id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {name}
        </a>
      </p>
    </div>
  );
};

AccommodationCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired
};

export default AccommodationCard;

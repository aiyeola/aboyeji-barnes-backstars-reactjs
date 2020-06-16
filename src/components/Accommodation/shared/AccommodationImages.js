import React from 'react';
import PropTypes from 'prop-types';

const AccommodationImages = ({ imageUrl }) => {
  const [imUrl, setImUrl] = React.useState('');
  let largeUrl;
  let gallery;

  const handleChange = (value) => {
    setImUrl(value);
  };

  if (imageUrl) {
    const firstUrl = imUrl === '' ? imageUrl[0] : imUrl;
    largeUrl = firstUrl.replace('load/', 'load/w_auto,h_400,c_scale/');
    gallery = imageUrl.map((image, index) => {
      const smallUrl = image.replace('load/', 'load/w_90,h_80,c_scale/');
      return (
        <div
          key={`${image[0]}-${index}`}
          className="one_card imageCard"
          style={{ background: `url(${smallUrl})` }}
          onClick={() => handleChange(image)}
          role="presentation"
        />
      );
    });
  }

  return (
    <>
      <div className="image" style={{ background: `url(${largeUrl})` }} />
      <div className="other-images scroll_container">{gallery}</div>
    </>
  );
};

AccommodationImages.propTypes = {
  imageUrl: PropTypes.array
};

export default AccommodationImages;

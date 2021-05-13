import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
  image: {
    width: '100%',
    height: '59vh',
  },
  imageCard: {
    width: '100%',
    height: '5rem',
  },
}));

const AccommodationImages = ({ imageUrl }) => {
  const classes = useStyles();

  const [imUrl, setImUrl] = useState('');
  let largeUrl;
  let gallery;

  if (imageUrl) {
    const firstUrl = imUrl === '' ? imageUrl[0] : imUrl;
    largeUrl = firstUrl.replace('load/', 'load/w_auto,h_400,c_scale/');
    gallery = imageUrl.map((image, index) => {
      const smallUrl = image.replace('load/', 'load/w_90,h_80,c_scale/');
      return (
        <Grid item key={`${image}-${index}`}>
          <Box onClick={() => setImUrl(image)} role="presentation">
            <img
              src={`${smallUrl}`}
              alt="gallery image"
              className={classes.imageCard}
            />
          </Box>
        </Grid>
      );
    });
  }

  return (
    <>
      <Grid item style={{ marginBottom: '1rem' }}>
        <Box>
          <img
            src={`${largeUrl}`}
            alt="accommodation image"
            className={classes.image}
          />
        </Box>
      </Grid>
      <Grid item container justify="space-between">
        {gallery}
      </Grid>
    </>
  );
};

AccommodationImages.propTypes = {
  imageUrl: PropTypes.array,
};

export default AccommodationImages;

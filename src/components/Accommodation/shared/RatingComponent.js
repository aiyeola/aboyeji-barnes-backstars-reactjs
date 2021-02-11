import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { connect } from 'react-redux';

import { rateAccommodation } from '../../../redux/actions/accommodationsAction';

const labels = {
  1: 'Useless 💩',
  2: 'Poor 😞',
  3: 'Ok 👌🏽',
  4: 'Good 🙂',
  5: 'Excellent 👍🏽',
};
function RatingComponent(props) {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);

  useEffect(() => {
    props.userRating.userRating !== null &&
      setValue(props.userRating.userRating);
  }, [props.userRating.userRating]);

  const handleClick = async (value) => {
    setValue(value);
    await props.rateAccommodation({ rating: value }, props.accommodationId);
    props.getUpdate();
  };

  return (
    <>
      <Grid item style={{ marginRight: '1em' }}>
        <Typography>Rate</Typography>
      </Grid>
      <Rating
        name="ratings"
        value={value}
        onChange={(e, newValue) => handleClick(newValue)}
        onChangeActive={(e, newHover) => setHover(newHover)}
      />
      {value !== null && (
        <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>
      )}
    </>
  );
}

RatingComponent.propTypes = {
  userRating: PropTypes.object.isRequired,
  accommodationId: PropTypes.number.isRequired,
  getUpdate: PropTypes.func.isRequired,
};

const mapStateToProps = ({ rating }) => ({ rating });

export default connect(mapStateToProps, { rateAccommodation })(RatingComponent);

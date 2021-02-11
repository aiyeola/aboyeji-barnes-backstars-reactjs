import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import TextArea from '../../shared/TextArea';
import feedbackAction from '../../../redux/actions/feedbackAction';

const ReviewComponent = (props) => {
  const [review, setReview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    if (review.length > 11) {
      setSubmitting(true);
      props.feedbackAction(props.accommodationId, { feedback: review });
    }
  };

  if (props.reviewError) {
    setSubmitting(false);
  }

  const onChange = (value) => {
    setReview(value);
  };

  return (
    <>
      <Grid item style={{ marginBottom: '1rem' }}>
        <TextArea name="review" value={review} onChange={onChange} />
      </Grid>

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
      >
        {submitting ? (
          <CircularProgress color="secondary" size={25} />
        ) : (
          'Leave a review'
        )}
      </Button>
    </>
  );
};

ReviewComponent.propTypes = {
  feedbackAction: PropTypes.func.isRequired,
  accommodationId: PropTypes.number.isRequired,
  reviewError: PropTypes.bool.isRequired,
};

export default connect(null, { feedbackAction })(ReviewComponent);

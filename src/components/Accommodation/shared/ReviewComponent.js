import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '../../shared/TextArea';
import Button from '../../shared/Button';
import feedbackAction from '../../../redux/actions/feedbackAction';

const ReviewComponent = (props) => {
  const { feedbackAction: addReview, accommodationId, reviewError } = props;
  const [review, setReview] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  console.log('review: ', review);
  const handleChange = ({ target }) => {
    setReview(target.value);
  };

  const handleSubmit = () => {
    if (review) {
      setIsSubmitting(true);
      addReview(accommodationId, { feedback: review });
    }
  };

  let submitting = isSubmitting;
  if (reviewError) {
    submitting = false;
  }

  return (
    <div>
      <TextArea name="review" value={review} onChange={handleChange} />
      <br />
      <Button
        ButtonId="add-review"
        classes="btn btn-primary"
        text="Add Review"
        onClick={handleSubmit}
        submitting={submitting}
      />
    </div>
  );
};

ReviewComponent.propTypes = {
  feedbackAction: PropTypes.func.isRequired,
  accommodationId: PropTypes.number.isRequired,
  reviewError: PropTypes.bool.isRequired
};

export default connect(null, { feedbackAction })(ReviewComponent);

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const OneReviewComponent = ({ review }) => (
  <div className="m-top-1 one-review" key={review.id}>
    <div className="grid grid-sm review-container">
      <div className="col-1 col-sm-1">
        <img
          src={
            review.User.ProfilePicture
              ? review.User.ProfilePicture.url
              : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png'
          }
          className="profile-picture col-1"
          alt="Profile"
          height="30"
          width="30"
        />
      </div>
      <div className="col-11 col-sm-11">
        <span>
          {review.User.firstName} {review.User.lastName}
        </span>
        <br />
        <em className="">{moment(review.createdAt).fromNow()}</em>
      </div>
    </div>
    <div
      className="m-top-1"
      dangerouslySetInnerHTML={{ __html: review.feedback }}
    />
  </div>
);

OneReviewComponent.propTypes = {
  review: PropTypes.object.isRequired
};

export default OneReviewComponent;

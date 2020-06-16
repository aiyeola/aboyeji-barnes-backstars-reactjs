import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import { connect } from 'react-redux';
import { rateAccommodation } from '../../../redux/actions/accommodationsAction';

class RatingComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: 0 };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { userRating } = this.props;

    if (userRating === undefined) {
      this.setState({ value: 0 });
      return;
    }
    this.setState({ value: userRating.userRating });
  }

  componentDidUpdate(prevProps) {
    const { userRating } = this.props;
    if (userRating !== prevProps.userRating) {
      this.setState({ value: userRating.userRating });
    }
  }

  async handleClick(item) {
    const { rateAccommodation, accommodationId, getUpdate } = this.props;
    await rateAccommodation({ rating: item }, accommodationId);
    this.setState({ value: item });
    getUpdate();
  }

  render() {
    const { value } = this.state;
    return (
      <>
        <Rating
          className="rating-container"
          initialRating={value}
          onClick={(e) => this.handleClick(e)}
          emptySymbol="fa fa-star-o fa-lg"
          fullSymbol="fa fa-star fa-lg"
        />
        <p className="starsCount">User Rating: {value}</p>
      </>
    );
  }
}

RatingComponent.propTypes = {
  userRating: PropTypes.object.isRequired,
  accommodationId: PropTypes.number.isRequired,
  getUpdate: PropTypes.func.isRequired
};

const mapStateToProps = ({ rating }) => ({ rating });

export default connect(mapStateToProps, { rateAccommodation })(RatingComponent);

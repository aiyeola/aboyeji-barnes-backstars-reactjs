import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import likeAction from '../../../redux/actions/likeAction';

export class LikeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: 0,
      liked: false
    };

    this.likeOrUnlike = this.likeOrUnlike.bind(this);
  }

  componentDidMount() {
    const { likes } = this.props;
    this.setState({ likes });
  }

  componentWillReceiveProps(nextProps) {
    const { like } = nextProps;
    if (like) {
      switch (like.status) {
        case 'like_success':
          break;
        case 'like_error':
          const { likes, liked } = this.state;
          let payload;
          if (liked) {
            payload = {
              liked: false,
              likes: likes - 1
            };
          } else {
            payload = {
              liked: true,
              likes: likes + 1
            };
          }
          this.setState(payload);
          break;
        default:
          break;
      }
    }
  }

  likeOrUnlike() {
    const { likes, liked } = this.state;
    let payload;
    if (liked) {
      payload = {
        liked: false,
        likes: likes - 1
      };
    } else {
      payload = {
        liked: true,
        likes: likes + 1
      };
    }
    this.setState(payload);
    const { likeAction: likeAccommodation, accommodationId } = this.props;
    likeAccommodation(accommodationId);
  }

  render() {
    const { likes, liked } = this.state;
    return (
      <div className="likes-container m-left-1">
        <div className="likes-number">
          {likes && likes}
          {likes > 1
            ? ' Likes'
            : likes === 0
            ? 'Be the first one to like'
            : ' Like'}
        </div>
        <button
          id="like-button"
          className={`${liked ? 'liked' : 'not-liked'}`}
          onClick={this.likeOrUnlike}
        >
          <i className={`fa ${liked ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`} />
          &nbsp;Like
        </button>
      </div>
    );
  }
}

LikeComponent.propTypes = {
  accommodationId: PropTypes.number.isRequired,
  like: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  likeAction: PropTypes.func.isRequired
};

const mapStateToProps = ({ like }) => ({ like });

export default connect(mapStateToProps, { likeAction })(LikeComponent);

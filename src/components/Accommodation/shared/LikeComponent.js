import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

import likeAction from '../../../redux/actions/likeAction';

function LikeComponent(props) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLikes(props.like);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (props.like) {
      switch (props.like) {
        case 'like_success':
          break;
        case 'like_error':
          if (liked) {
            setLiked(false);
            setLikes(likes - 1);
          } else {
            setLiked(true);
            setLikes(likes + 1);
          }
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.like]);

  const likeOrUnlike = () => {
    const { likeAction: likeAccommodation, accommodationId } = props;
    if (liked) {
      setLiked(false);
      setLikes(likes - 1);
    } else {
      setLiked(true);
      setLikes(likes + 1);
    }
    likeAccommodation(accommodationId);
  };

  return (
    <Box>
      <Typography>
        {likes && likes}{' '}
        {likes > 1
          ? ' Likes'
          : likes === 0
          ? 'Be the first one to like'
          : ' Like'}
      </Typography>
      <IconButton onClick={likeOrUnlike}>
        {liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />}
      </IconButton>
    </Box>
  );
}

LikeComponent.propTypes = {
  accommodationId: PropTypes.number.isRequired,
  like: PropTypes.number.isRequired,
  likes: PropTypes.number.isRequired,
  likeAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ like }) => ({ like });

export default connect(mapStateToProps, { likeAction })(LikeComponent);

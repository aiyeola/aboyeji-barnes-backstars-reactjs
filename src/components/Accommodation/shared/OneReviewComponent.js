import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(6), // set to 30px and check
    height: theme.spacing(6),
  },
}));

const OneReviewComponent = ({ review }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Grid container spacing={1}>
      <Grid item sm={1}>
        <Avatar
          alt="profile picture"
          src={
            review.User.ProfilePicture
              ? review.User.ProfilePicture.url
              : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png'
          }
          className={classes.large}
        />
      </Grid>
      <Grid item container direction="column" sm={11}>
        <Grid item style={{ marginBottom: '1rem' }}>
          <Typography variant="h6">
            {review.User.firstName} {review.User.lastName}
          </Typography>
          <Typography
            component="em"
            variant="body1"
            style={{ fontSize: '.7rem', color: theme.palette.grey[500] }}
          >
            {moment(review.createdAt).fromNow()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography>{review.feedback}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

OneReviewComponent.propTypes = {
  review: PropTypes.object.isRequired,
};

export default OneReviewComponent;

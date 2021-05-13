import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';

// import Rating from 'react-rating';
const useStyles = makeStyles((theme) => ({
  root: {
    // maxWidth: 700,
    borderRadius: 20,
    // marginTop: '1rem',
    // marginBottom: '1rem',
    // marginLeft: '1rem',
  },
  media: {
    height: '100%',
    width: '100%',
  },
  lightFont: {
    color: theme.palette.grey[600],
  },
}));

const Accommodation = ({
  id,
  name,
  location,
  imageUrl,
  description,
  likes,
  rooms,
  rating,
}) => {
  const classes = useStyles();

  const largeUrl = imageUrl[0].replace('load/', 'load/w_auto,h_200,c_scale/');

  return (
    <>
      <Card className={classes.root}>
        <Grid container>
          <Grid item sm={4}>
            <CardMedia
              className={classes.media}
              image={largeUrl}
              title="accommodation image"
            />
          </Grid>
          <Grid item container direction="column" sm={8}>
            <CardContent>
              <Grid
                container
                justify="space-between"
                style={{ marginBottom: '.5rem' }}
              >
                <Grid item>
                  <Typography>{name}</Typography>
                </Grid>
                <Grid item>
                  <Rating
                    name="rating-accommodation"
                    value={rating === undefined ? 0 : rating}
                    readOnly
                  />
                </Grid>
              </Grid>

              <Grid
                container
                alignItems="center"
                style={{ marginBottom: '.7rem' }}
              >
                <Grid item>
                  <LocationOnOutlinedIcon color="primary" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" className={classes.lightFont}>
                    {location}
                  </Typography>
                </Grid>
              </Grid>

              <Grid item style={{ marginBottom: '.7rem' }}>
                <div
                  className={classes.lightFont}
                  dangerouslySetInnerHTML={{
                    __html: `${description.substring(0, 100)}...`,
                  }}
                />
              </Grid>

              <Grid item className={classes.lightFont}>
                <Typography>{rooms} rooms</Typography>
              </Grid>
            </CardContent>

            <CardActions disableSpacing style={{ padding: 0 }}>
              <Grid item style={{ width: '100%' }}>
                <Link
                  href={`/accommodation/${id}`}
                  style={{
                    width: 'inherit',
                    textDecoration: 'none',
                  }}
                >
                  <Button
                    disableElevation
                    color="primary"
                    variant="contained"
                    style={{
                      width: 'inherit',
                      paddingTop: 10,
                      paddingBottom: 10,
                      borderRadius: 0,
                    }}
                  >
                    Book Now!
                  </Button>
                </Link>
              </Grid>
            </CardActions>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

Accommodation.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  imageUrl: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  likes: PropTypes.number.isRequired,
  rooms: PropTypes.number.isRequired,
};

export default Accommodation;

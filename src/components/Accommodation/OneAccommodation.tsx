import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SnackBar from '@material-ui/core/Snackbar';
import Rating from '@material-ui/lab/Rating';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
d;
import Map from './MapComponent';
import LikeComponent from './shared/LikeComponent';
import ReviewComponent from './shared/ReviewComponent';
import OneReviewComponent from './shared/OneReviewComponent';
import ImageGallery from './shared/AccommodationImages';
import InfoSection from './shared/InfoSection';
import RatingComponent from './shared/RatingComponent';
import AddRoom from './shared/AddRoom';
import enhanceRooms from '../../helpers/RoomClasses';
import { getAccommodation } from '../../redux/actions/accommodationsAction';

import { accommodation } from '../../__mocks__/accommodation';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: '10vw',
    paddingRight: '10vw',
    // backgroundColor: '#ff23c3',
    marginTop: '5vh',
    '.MuiGrid-spacing-xs-3': {
      width: 0,
      margin: 0,
    },
  },
  infoSection: {
    marginBottom: '1rem',
    border: `1px solid ${theme.palette.common.black}`,
  },
}));

function OneAccommodation(props) {
  const classes = useStyles();
  const theme = useTheme();

  const [isCreating, setIsCreating] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [roomError, setRoomError] = useState(null);
  const [roomsList, setRoomsList] = useState('');
  const [likes, setLikes] = useState(false);
  const [reviewError, setReviewError] = useState(false);
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    backgroundColor: '',
  });

  useEffect(() => {
    // props.getAccommodation(props.match.params.id);
  }, []);

  useEffect(() => {
    if (props.user) {
      handleAuth(props.user);
    }

    if (props.addRoom) {
      setRoom(props.addRooms);
    }
  }, [props.user, props.addRoom]);

  const submit = () => setSubmitting(true);
  const toggleCreating = () => setIsCreating(!isCreating);
  const getUpdate = () => props.getAccommodation(props.match.params.id);
  const toggleModal = () => setShowModal(!showModal);
  const handleAuth = (user) => {
    const allowed = ['Accommodation Supplier', 'Travel Administrator'];
    if (isAllowed !== true) {
      if (allowed.includes(user.userRole)) {
        setIsAllowed(true);
      }
    }
  };

  const setRoom = (room) => {
    if (room.rooms) {
      if (room.rooms !== roomsList) {
        setRoomsList(room.roooms);
        setSubmitting(false);
        setIsCreating(false);
      } else if (room.error) {
        if (room.error !== roomError) {
          setRoomError(room.error);
          setSubmitting(false);
          setAlert({
            open: true,
            message: room.error,
            backgroundColor: theme.palette.error.main,
          });
        }
      }
    }
  };

  const {
    match: {
      params: { id },
    },
  } = props;

  // props
  // const acc = props.accommodation.accommodation
  // mocks
  const acc = accommodation;
  const rating = acc.rating;
  let rooms;
  let location;
  let amenities = [];
  let services = [];
  let description;
  let like;
  let map;
  let reviewsDisplay;

  if (Object.keys(acc).length !== 0 && acc.constructor === Object) {
    const allRooms = [...acc.rooms, ...roomsList];
    rooms = enhanceRooms(allRooms);
    location = `${acc.Location.city}, ${acc.Location.country}`;
    amenities = acc.amenities;
    services = acc.services;
    description = acc.description;
    like = <LikeComponent accommodationId={acc.id} likes={acc.likes.length} />;
    // map = (
    //   <Map
    //     google={this.props.google}
    //     center={acc.mapLocations}
    //     height="200px"
    //     zoom={15}
    //     display={null}
    //   />
    // );
  }

  if (acc.Feedbacks) {
    reviewsDisplay = acc.Feedbacks.map((review, index) => (
      <OneReviewComponent key={index} review={review} />
    ));
  }
  return (
    <>
      <Grid container className={classes.container} spacing={3}>
        <Grid item container sm={8}>
          <Grid item container direction="column">
            <Grid item style={{ marginBottom: '.5rem' }}>
              <Typography
                variant="h4"
                component={'span'}
                style={{ marginRight: '1rem' }}
              >
                {acc.name}
              </Typography>
              <Rating
                name="rating-accommodation"
                value={rating === undefined ? 0 : rating.averageRating}
                readOnly
              />
            </Grid>
            <Grid
              item
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '1rem',
              }}
            >
              <LocationOnRoundedIcon />{' '}
              <Typography variant="body2" component={'span'}>
                {location}
              </Typography>
            </Grid>
            <Grid
              item
              container
              direction="column"
              style={{ marginBottom: '1rem' }}
            >
              <ImageGallery imageUrl={acc.imageUrl} />
            </Grid>
          </Grid>

          <Grid item container className={classes.infoSection}>
            <InfoSection
              description={description}
              amenities={amenities}
              services={services}
              reviews={reviewsDisplay}
              accommodationId={id}
              reviewError={reviewError}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justify="center"
          sm={4}
          style={{ backgroundColor: '#fefe34' }}
        >
          <RatingComponent
            getUpdate={getUpdate}
            userRating={rating}
            accommodationId={id}
          />
          {/* <Grid item>{like}</Grid> */}
        </Grid>
      </Grid>

      <SnackBar
        open={alert.open}
        message={alert.message}
        ContentProps={{
          style: {
            backgroundColor: alert.backgroundColor,
          },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => setAlert({ ...alert, open: false })}
        autoHideDuration={3000}
      />
    </>
  );
}

const mapStateToProps = ({ accommodation, feedback }) => ({
  accommodation,
  feedback,
});

export default connect(mapStateToProps, { getAccommodation })(OneAccommodation);

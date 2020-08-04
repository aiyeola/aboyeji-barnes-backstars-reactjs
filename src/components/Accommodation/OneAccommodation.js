import React from 'react';
import { connect } from 'react-redux';
import Rating from 'react-rating';
import Map from './MapComponent';
import LikeComponent from './shared/LikeComponent';
import ReviewComponent from './shared/ReviewComponent';
import OneReviewComponent from './shared/OneReviewComponent';
import ImageGallery from './shared/AccommodationImages';
import Amenities from './shared/ViewServices';
import ServicesModal from './shared/ServicesModal';
import RatingComponent from './shared/RatingComponent';
import Button from '../shared/Button';
import AddRoom from './shared/AddRoom';
import enhanceRooms from '../../helpers/RoomClasses';
import { getAccommodation } from '../../redux/actions/accommodationsAction';

// import { accommodation } from '../../__mocks__/accommodation';
class OneAccommodation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isCreating: false,
      isAllowed: false,
      showModal: false,
      submitting: false,
      roomError: null,
      roomsList: '',
      liked: false,
      reviewError: false
    };

    this.handleAuth = this.handleAuth.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.getUpdate = this.getUpdate.bind(this);
    this.toggleCreating = this.toggleCreating.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {
    this.setState({ submitting: true });
  }

  toggleCreating() {
    const { isCreating } = this.state;
    this.setState({ isCreating: !isCreating });
  }

  getUpdate() {
    const {
      getAccommodation,
      match: {
        params: { id }
      }
    } = this.props;
    getAccommodation(id);
  }

  toggleModal() {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  }

  handleAuth(user) {
    const { isAllowed } = this.state;
    const allowed = ['Accommodation Supplier', 'Travel Administrator'];
    if (isAllowed !== true) {
      if (allowed.includes(user.userRole)) {
        this.setState({
          isAllowed: true
        });
      }
    }
  }

  componentDidMount() {
    const {
      match: {
        params: { id }
      },
      getAccommodation
    } = this.props;
    getAccommodation(id);
  }

  componentDidUpdate() {
    const { addRooms, user } = this.props;
    if (user) {
      this.handleAuth(user);
    }
    if (addRooms) {
      this.setRoom(addRooms);
    }
  }
  render() {
    const {
      isCreating,
      isAllowed,
      showModal,
      roomError,
      submitting,
      roomsList,
      reviewError
    } = this.state;

    const {
      accommodation,
      match: {
        params: { id }
      }
    } = this.props;

    const acc = accommodation.accommodation;
    const rating = acc.rating;
    let rooms;
    let location;
    let description;
    let map;
    let like;
    let amenity = [];
    let service = [];

    if (Object.keys(acc).length !== 0 && acc.constructor === Object) {
      const allRooms = [...acc.rooms, ...roomsList];
      rooms = enhanceRooms(allRooms);
      location = `${acc.Location.city}, ${acc.Location.country}`;
      amenity = acc.amenities;
      service = acc.services;
      description = acc.description;
      map = (
        <Map
          google={this.props.google}
          center={acc.mapLocations}
          height="200px"
          zoom={15}
          display={null}
        />
      );

      like = (
        <LikeComponent accommodationId={acc.id} likes={acc.likes.length} />
      );
    }

    let reviewsDisplay;
    if (acc.Feedbacks) {
      reviewsDisplay = acc.Feedbacks.map((review, index) => (
        <OneReviewComponent key={index} review={review} />
      ));
    }
    const addReview = (
      <ReviewComponent reviewError={reviewError} accommodationId={acc.id} />
    );

    return (
      <>
        <div className="main-frame">
          <div className="main_container">
            <div className="grid grid-sm">
              <div className="col-8 col-sm-12 details">
                <div className="top-title">
                  <h2>{acc.name}</h2>
                  <span className="location">
                    <p>{location}</p>
                  </span>
                  <div className="rate">
                    <Rating
                      className="rating-container"
                      initialRating={
                        rating === undefined ? 0 : rating.averageRating
                      }
                      readonly
                      emptySymbol="fa fa-star-o fa-lg"
                      fullSymbol="fa fa-star fa-lg"
                    />
                    {rating === undefined ? 0 : rating.averageRating} star
                  </div>
                  <ImageGallery imageUrl={acc.imageUrl} />
                  <div
                    className="description"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                  <hr />
                  <div className="amen-ser">
                    <Amenities amenities={amenity} services={service} />
                  </div>
                  {showModal && (
                    <ServicesModal
                      amenities={amenity}
                      services={service}
                      closeModal={this.toggleModal}
                    />
                  )}
                  <button
                    className="view-all"
                    role="presentation"
                    onClick={this.toggleModal}
                  >
                    View All Amenities and Services
                  </button>
                  <hr />
                </div>
              </div>
              <div className="col-4 col-sm-12 side-info">
                <span className="h-word">
                  <h3>Location</h3>
                </span>
                {/* <div className="map">{map}</div> */}
                <div className="rating center">
                  <span className="">
                    <h3>Rate Hotel</h3>
                  </span>
                  <RatingComponent
                    userRating={rating}
                    accommodationId={id}
                    getUpdate={this.getUpdate}
                  />
                </div>
                <div className="review m-left-1 grid">
                  <div className="col-6">
                    <a href="#review">
                      <h4>✙ Write a Review</h4>
                    </a>
                  </div>
                  <div className="col-6">
                    <a href="#reviews">
                      <h4>All Reviews</h4>
                    </a>
                  </div>
                </div>
                <div className="like">{like}</div>
              </div>
            </div>
            <div className="room_container">
              <h3>Rooms</h3>
              {!isAllowed && (
                <div className="grid">
                  <div className="col-12 center">{roomError || ''}</div>
                  <div className="col-10">
                    <Button
                      buttonType="button"
                      ButtonId="create-start"
                      classes={`btn m-top-3 m-bottom-1 ${
                        isCreating ? 'btn-danger' : 'btn-primary'
                      }`}
                      text={isCreating ? '✖ Close' : '✙ Add Rooms'}
                      onClick={this.toggleCreating}
                    />
                  </div>
                  <div className="col-2" />
                  {isCreating && (
                    <AddRoom
                      submitting={submitting}
                      submit={this.submit}
                      id={id}
                    />
                  )}
                </div>
              )}
              <div className="rooms scroll_container">{rooms}</div>
            </div>
            <div className="review" id="review">
              <h2 className="m-left-1 p-top-2 reviews-title">Reviews</h2>
              {addReview}
            </div>
            <div className="review m-bottom-5 p-top-2" id="reviews">
              <em className="m-left-1">All reviews...</em>
              <br />
              {reviewsDisplay}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = ({ accommodation, feedback }) => ({
  accommodation,
  feedback
});

export default connect(mapStateToProps, { getAccommodation })(OneAccommodation);

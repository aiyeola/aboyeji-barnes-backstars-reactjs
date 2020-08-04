import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Meta from '../shared/Meta';
import BookCard from './shared/BookCard';
import AccommodationCard from './shared/accommodationCard';
import { validateBooking } from '../../helpers/validator';
import getRooms from '../../redux/actions/roomsAction';
import { bookRoom } from '../../redux/actions/bookingAction';
import {
  getAccommodations,
  getAccommodation
} from '../../redux/actions/accommodationsAction';

class BookRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeLocation: undefined,
      error: {
        details: '',
        class: 'hidden'
      }
    };
  }

  componentWillMount() {
    const { request } = this.props;
    const { accommodations } = request.data[0];
    const oneReq = request.data[0];
    const requests = [];
    accommodations.forEach((acc, index) => {
      const req1 = {};
      const { travelDate, returnDate, accommodations } = oneReq;
      req1.travelDate = travelDate[index];
      req1.returnDate = returnDate;
      req1.accommodation = accommodations[index].name;
      req1.location = accommodations[index].Location;
      req1.accommodationId = accommodations[index].id;
      requests.push(req1);
    });
    this.setState({ trips: requests });
    const { getAccommodations, user, getRooms } = this.props;
    getAccommodations({ role: user });
    getRooms();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { booking, history } = nextProps;
    if (booking.data || booking.error) {
      const { data, error } = booking;
      if (data) {
        toast.success(data.message);
        history.push('/requests');
      } else {
        const { status, message } = error;
        if (status === 422) {
          toast.error('Check your inputs');
        } else if (status === 401) {
          toast.error('The current session is expired. Login');
          localStorage.removeItem('barnesToken');
          history.push('/log-in');
        } else if (status === 403) {
          toast.error(message);
          history.push('/dashboard');
        } else if (status === 404) {
          toast.error(message);
          history.push('/requests');
        } else if (status === 409) {
          toast.error(message);
          history.push('/requests');
        } else {
          toast.error(message);
        }
      }
    }
  }

  handleImageClick = async (id, name) => {
    const { activeLocation, trips } = this.state;
    const value = name;
    if (activeLocation === undefined) {
      const activeLoc = trips[0].location.id;
      this.setState({ activeLocation: activeLoc });
    }

    // find which array contains the location

    let parent;
    trips.forEach((trip, index) => {
      if (trip.location.id === activeLocation) {
        parent = index;
      }
    });

    trips[parent] = { ...trips[parent], accommodation: value };
    this.setState({ trips });
    const { allAccommodations, rooms } = this.props;
    const accommodation = allAccommodations.accommodations.find(
      (acc) => acc.name === value
    );
    const accommodationId = accommodation.id;
    const availableRooms = rooms.data.filter(
      (room) => room.accommodationId === accommodationId
    );
    trips[parent] = { ...trips[parent], accommodationId, availableRooms };
    this.setState({ trips });
  };

  handleChange = async ({ target }) => {
    const parent = target.attributes.unique.value;
    const { trips } = this.state;
    const { value } = target;
    if (target.name === 'accommodation' && value !== 'Select Accommodation') {
      trips[parent] = { ...trips[parent], [target.name]: value };
      this.setState({ trips });
      this.setState({ selectedAccommodation: value });
      const { allAccommodations, rooms } = this.props;
      const accommodation = allAccommodations.accommodations.find(
        (acc) => acc.name === value
      );
      const { id } = accommodation;
      const availableRooms = rooms.data.filter(
        (room) => room.accommodationId === id
      );
      trips[parent] = { ...trips[parent], accommodationId: id, availableRooms };
      this.setState({ trips });
    } else if (target.name === 'room') {
      const { activeLocation, trips, possibleAccommodations } = this.state; // active Location is shitting me.
      const selectedAccommodation = trips[parent].accommodation;
      const { rooms } = this.props;
      const activeAccommodation = possibleAccommodations.find(
        (acc) =>
          acc.locationId === activeLocation &&
          acc.name === selectedAccommodation
      ); // should use possibleAccommodations
      const { id } = activeAccommodation; // this might be the mistake
      if (value !== 'Select Room') {
        const activeRoom = rooms.data.find((room) => {
          return room.accommodationId === id && room.name === value;
        });
        const roomId = activeRoom.id;
        trips[parent] = { ...trips[parent], [target.name]: roomId };
        this.setState({ trips });
      }
    } else {
      trips[parent] = { ...trips[parent], [target.name]: value };
      this.setState({ trips });
    }
  };

  handleFocus = (locationId, possibleAccommodations) => {
    const { activeLocation } = this.state;
    if (locationId !== activeLocation) {
      this.setState({ activeLocation: locationId, possibleAccommodations });
    }
  };

  handleCancel = () => {
    const { toggleBooking } = this.props;
    toggleBooking();
  };

  handleSubmit = async () => {
    const { trips } = this.state;
    const { bookRoom, request } = this.props;
    const requestId = request.data[0].id;
    const bookDetails = [];
    const toValidate = [];
    trips.forEach((trip) => {
      const {
        checkIn,
        checkOut,
        accommodation,
        room,
        travelDate,
        returnDate
      } = trip;
      bookDetails.push({ checkIn, checkOut, accommodation, room });
      toValidate.push({
        checkIn,
        checkOut,
        accommodation,
        room,
        travelDate,
        returnDate
      });
    });
    const error = validateBooking(toValidate);
    if (!error) {
      bookRoom(bookDetails, requestId);
    } else {
      this.setState({ error: { details: error, class: 'visible' } });
    }
  };

  render() {
    const { classes, allAccommodations, rooms } = this.props;
    const nonBookings = rooms.data.filter(
      (room) => room.status === 'Available'
    );
    const {
      trips,
      possibleAccommodations,
      availableRooms,
      selectedAccommodation,
      error
    } = this.state;
    const accommodations = allAccommodations.accommodations.filter(
      (acc) => acc.status === 'Available'
    );
    const fLocId = trips[0].location.id;
    const firstAccommodations = accommodations.filter(
      (acc) => acc.locationId === fLocId
    );
    const selectedRooms = [];
    trips.forEach((trip) => {
      selectedRooms.push(trip.room);
    });
    const filteredAccommodations =
      possibleAccommodations || firstAccommodations;

    return (
      <div className={`${classes}`}>
        <Meta title="Booking-Rooms" />
        <div className="bg-img" />
        <div className="black-container black-short" />
        <p className="accommodation-title p-top-5 m-bottom-3">Booking</p>
        <div className="bookcards-container">
          {trips.map((trip, index) => (
            <BookCard
              trips={trips}
              handleGetRooms={this.handleGetRooms}
              selectedRooms={selectedRooms}
              availableRooms={availableRooms}
              displayRooms={this.displayRooms}
              rooms={nonBookings}
              handleFocus={this.handleFocus}
              key={trip.location.id}
              locationId={trip.location.id}
              handleChange={this.handleChange}
              parent={index}
              accommodations={accommodations}
              accommodation={selectedAccommodation || trip.accommodation}
              returnDate={trip.returnDate}
              travelDate={trip.travelDate}
              destination={`${trip.location.city} ${trip.location.country}`}
            />
          ))}
        </div>
        <div className={`${error.class} book-error error-multi-city`}>
          {error.details}
        </div>
        <div className="book-buttons-container">
          <button
            id="cancel-booking"
            type="button"
            className="btn btn-danger"
            onClick={this.handleCancel}
          >
            Cancel
          </button>
          <button
            id="submit-booking"
            type="submit"
            className="btn btn-secondary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="accommodations-container">
          {filteredAccommodations.map((acc) => (
            <AccommodationCard
              handleImageClick={this.handleImageClick}
              name={acc.name}
              url={acc.imageUrl}
              id={acc.id}
            />
          ))}
        </div>
      </div>
    );
  }
}

BookRoom.propTypes = {
  request: PropTypes.object.isRequired,
  classes: PropTypes.string.isRequired,
  getAccommodations: PropTypes.func.isRequired,
  allAccommodations: PropTypes.object.isRequired,
  user: PropTypes.string.isRequired,
  getRooms: PropTypes.func.isRequired,
  rooms: PropTypes.object.isRequired,
  toggleBooking: PropTypes.object.isRequired,
  bookRoom: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({
  request,
  accommodations,
  accommodation,
  profile,
  rooms,
  booking
}) => ({
  request,
  allAccommodations: accommodations,
  accommodation,
  user: profile.data.role,
  rooms,
  booking
});

const mapDispatchToProps = {
  bookRoom,
  getAccommodations,
  getAccommodation,
  getRooms
};

export default connect(mapStateToProps, mapDispatchToProps)(BookRoom);

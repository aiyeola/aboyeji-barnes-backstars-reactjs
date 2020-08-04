import React from 'react';
import Input from '../../shared/Input';
import Select from '../../shared/Select';
import Spinner from '../../shared/Spinner';

const BookCard = ({
  trips,
  destination,
  travelDate,
  returnDate,
  checkinDate,
  checkoutDate,
  parent,
  handleChange,
  accommodations,
  locationId,
  handleFocus,
  rooms
}) => {
  const time = new Date(travelDate);
  const day = time.getDate() + 2;
  const newTime = time.setDate(day);
  const safeCheckIn = new Date(newTime).toISOString().split('T')[0];
  const options = [];
  accommodations.forEach((acc) => {
    if (acc.locationId === locationId) {
      options.push(acc.name);
    }
  });

  const possibleAccommodations = accommodations.filter(
    (acc) => acc.locationId === locationId
  );
  const { availableRooms, accommodation, accommodationId, room } = trips[
    parent
  ];
  let selectedRoom;
  const roomNames = [];
  if (availableRooms) {
    availableRooms.forEach((availableRoom) => {
      roomNames.push(availableRoom.name);
    });
  }
  if (rooms && !availableRooms) {
    rooms.forEach((r) => {
      if (r.accommodationId === accommodationId) {
        roomNames.push(r.name);
      }
    });
  }

  return options.length > 0 ? (
    <div
      className="room-container"
      id={locationId}
      onMouseOver={() => {
        handleFocus(
          locationId,
          possibleAccommodations
        ); /* displayRooms(locationId, possibleAccommodations,rooms, accommodation); */
      }}
    >
      <div className="static-details">
        <span>Destination</span>
        <Input
          name="destination"
          value={destination}
          type="text"
          disabled="disabled"
        />
        <span>Travel Date</span>
        <Input
          name="travelDate"
          value={travelDate}
          type="text"
          disabled="disabled"
        />
        <span>Return Date</span>
        <Input
          name="returnDate"
          value={returnDate}
          type="text"
          disabled="disabled"
        />
        <span>Accommodation</span>
        <Select
          options={['Select Accommodation', ...options]}
          unique={parent}
          name="accommodation"
          selected={accommodation || 'Select Accommodation'}
          onChange={handleChange}
        />
      </div>
      <div className="dynamic-details">
        <span>Rooms</span>
        <Select
          options={['Select Room', ...roomNames]}
          unique={parent}
          name="room"
          selected={selectedRoom || 'Select room'}
          onChange={handleChange}
        />
        <span>Check In Date</span>
        <Input
          inputType="date"
          unique={parent}
          min={travelDate}
          max={safeCheckIn}
          name="checkIn"
          value={checkinDate}
          onChange={handleChange}
        />
        <span>Checkout Date</span>
        <Input
          inputType="date"
          unique={parent}
          min={travelDate}
          max={returnDate}
          name="checkOut"
          value={checkoutDate}
          onChange={handleChange}
        />
      </div>
    </div>
  ) : (
    <Spinner className="spinner-center" />
  );
};

export default BookCard;

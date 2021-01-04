/* eslint-disable no-useless-escape */
import * as yup from 'yup';
import moment from 'moment';

const messages = {
  short: 'Too short',
  required: 'This field is required',
  maxDate: "The birth date can't be later than 01-01-2002",
  phone: 'The phone number has to be exactly 10 numbers',
  department: 'You have to choose a department',
  gender: 'You have to choose a gender',
  validEmail: 'Please include an @ sign in the email',
  validPassword: 'least 8 char, a special char & a capital letter',
  validLong: 'Reason must be at least 30 characters',
  alphaNum: 'Has to start with a letter',
};

const schema = {
  firstName: yup
    .string()
    .matches(/^[a-zA-Z]/, messages.alphaNum)
    .min(3, messages.short)
    .required(messages.required),
  lastName: yup
    .string()
    .matches(/^[a-zA-Z]/, messages.alphaNum)
    .min(3, messages.short)
    .required(messages.required),
  userEmail: yup
    .string()
    .email(messages.validEmail)
    .required(messages.required),
  userPassword: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      messages.validPassword
    )
    .required(messages.required),
  password: yup
    .string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!_`,/@#\-"=:;~<>'\$%\^&\*\?\|\+\(\)\[\]\{}\.])(?=.{8,})/,
      messages.validPassword
    )
    .required(messages.required),
  passportName: yup.string().min(3, messages.short),
  passportNumber: yup.string().min(3, messages.short),
  birthDate: yup.date().max('01-01-2002', messages.maxDate),
  phoneNumber: yup.string().matches(/^[0-9]{10}$/, messages.phone),
  language: yup.string().min(3, messages.short),
  currency: yup.string().min(3, messages.short),
  location: yup.string().min(3, messages.short),
  department: yup.string().min(3, messages.department),
  gender: yup.string().min(3, messages.gender),
  email: yup.string().email(messages.validEmail).required(messages.required),
  reasonComment: yup.string().min(30, messages.validLong),
  role: yup.string().required(messages.required),
};

export default async (key, value) => {
  const newSchema = yup.object().shape({ [key]: schema[key] });
  const toCheck = { [key]: value };
  try {
    return await newSchema.nullable().validate(toCheck);
  } catch (err) {
    return {
      error: err.errors[0],
    };
  }
};

export const validateRequest = (payload) => {
  const travelDates = payload.trips.map((trip) => trip.travelDate);
  const accommodations = payload.trips.map((trip) => trip.accommodation);
  const locations = payload.trips.map((trip) => trip.location);
  // Add profile info validations!
  if (
    accommodations.includes('') ||
    locations.includes('') ||
    !payload.reason ||
    !payload.from
  ) {
    return 'Please fill all fields';
  }
  if (moment().isAfter(travelDates[0]) === true) {
    return 'Travel Dates must be later than today';
  }
  if (payload.returnDate !== undefined) {
    if (
      moment(travelDates[travelDates.length - 1]).isAfter(
        payload.returnDate
      ) === true
    ) {
      return 'The Return Date must be later than travel date';
    }
  }
  if (travelDates.length > 1) {
    for (let date = 0; date < travelDates.length - 1; date += 1) {
      if (moment(travelDates[date]).isAfter(travelDates[date + 1]) === true) {
        return 'Travel Dates must be in order';
      }
    }
  }
  return null;
};

export const validateBooking = (payload) => {
  // eslint-disable-next-line consistent-return
  let error;
  payload.forEach((elem, index) => {
    // eslint-disable-next-line no-unused-vars
    // error against empty fields
    const {
      travelDate,
      returnDate,
      checkIn,
      checkOut,
      room,
      accommodation,
    } = elem;
    if (
      !checkIn ||
      !checkOut ||
      !room ||
      room === 'Select Room' ||
      !accommodation ||
      accommodation === 'Select Accommodation'
    ) {
      error = 'Please fill all fields';
      return;
    }
    const checkInDate = parseInt(checkIn.split('-')[2], 10);
    const travel = parseInt(travelDate.split('-')[2], 10);
    if (!(checkInDate >= travel && checkInDate <= travel + 2)) {
      error = 'You must check in within 2 days after travel date';
      return;
    }
    if (moment(checkOut).isAfter(returnDate)) {
      error = 'Checkout dates must be before the return Date';
      return;
    }
    if (
      index > 0 &&
      moment(payload[index].checkIn).isBefore(payload[index - 1].checkOut)
    ) {
      error =
        'Check in dates must be later than the checkout date of Previous accommodation';
      return;
    }
  });
  return error || null;
};

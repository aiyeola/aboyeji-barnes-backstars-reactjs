/* eslint-disable no-useless-escape */
import * as yup from 'yup';

const messages = {
  short: 'Too short',
  required: 'This field is required',
  maxDate: "The birth date can't be later than 01-01-2002",
  phone: 'The phone number has to be exactly 10 numbers',
  department: 'You have to choose a department',
  gender: 'You have to choose a gender',
  validEmail: 'Please include an @ sign in the email',
  validPassword:
    'Password must be at least 8 characters with at least a special letter and a capital letter',
  validLong: 'Reason must be at least 30 characters',
  alphaNum: 'Has to start with a letter'
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
  role: yup.string().required(messages.required)
};

export default (key, value) => {
  const newSchema = yup.object().shape({ [key]: schema[key] });
  const toCheck = { [key]: value };
  return newSchema
    .nullable()
    .validate(toCheck)
    .catch((err) => ({
      error: err.errors[0]
    }));
};

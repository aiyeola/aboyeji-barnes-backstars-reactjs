/* eslint-disable operator-linebreak */
const token = `Bearer ${localStorage.getItem('barnesToken')}`;

export const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://aboyeji-barnes-backstars.herokuapp.com'
    : 'http://localhost:4000';

export const config = {
  headers: {
    Authorization: token
  }
};

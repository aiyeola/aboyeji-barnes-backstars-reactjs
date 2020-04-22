/* eslint-disable operator-linebreak */
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.baseUrl
    : 'http://localhost:4000';

const token = `Bearer ${localStorage.getItem('barnesToken')}`;

export const config = {
  headers: {
    Authorization: token
  }
};

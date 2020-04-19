/* eslint-disable import/prefer-default-export */
export const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.baseUrl
    : 'http://localhost:4000';

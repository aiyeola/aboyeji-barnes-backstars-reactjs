import axios from 'axios';
import { baseUrl } from '.';

export default axios.create({ baseUrl });

const token = `Bearer ${localStorage.getItem('barnesToken')}`;
export const config = {
  headers: {
    Authorization: token
  }
};

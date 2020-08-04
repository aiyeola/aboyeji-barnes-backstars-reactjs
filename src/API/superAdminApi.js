import axios from 'axios';
import { BASE_URL, config } from '../config';

const addSupplier = async ({ userEmail, firstName, lastName }) => {
  const url = `${BASE_URL}/api/v1/auth/add-user`;
  try {
    const data = await axios.post(
      url,
      {
        userEmail,
        firstName,
        lastName
      },
      config
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
};
export default addSupplier;

import axios from 'axios';
import { baseUrl } from '../config';

export async function signUp(userDetails) {
  try {
    const data = await axios.post(`${baseUrl}/api/v1/auth/signup`, userDetails);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function verify(token) {
  try {
    const data = await axios.patch(
      `${baseUrl}/api/v1/auth/verify/?token=${token}`
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

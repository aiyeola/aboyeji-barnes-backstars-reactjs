import axios from 'axios';

import { BASE_URL, config } from 'src/config';
import { UserDetails } from '@redux/actions/signUpAction';

export async function signUp(userDetails: UserDetails) {
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/auth/signup`,
      userDetails,
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function verify(token: string) {
  try {
    const data = await axios.patch(
      `${BASE_URL}/api/v1/auth/verify/?token=${token}`,
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function reverify(userEmail: string) {
  try {
    const data = await axios.post(
      `${BASE_URL}/api/v1/auth/create-link`,
      userEmail,
    );
    return data;
  } catch (error) {
    return error.response.data;
  }
}

export async function checkUser() {
  try {
    const data = await axios.get(`${BASE_URL}/api/v1/auth/check-user`, config);
    return data;
  } catch (error) {
    return error.response.data;
  }
}

import axios from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute, UserType } from '../enums';
import { User } from '../types';

const LOGIN_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.LOGIN}`;
const REGISTER_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.REGISTER}`;

export async function authLogin(username: string, password: string): Promise<User | null> {
  const params = JSON.stringify({
    password,
    username,
  });

  const { token: accessToken, user }: { token: string; user: User } = (
    await axios.post(LOGIN_API_URL, params, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;

  return { ...user, accessToken };
}

export async function authRegister(
  username: string,
  password: string,
  email: string,
): Promise<void> {
  const params = JSON.stringify({
    email,
    password,
    username,
  });

  await axios.post(REGISTER_API_URL, params, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

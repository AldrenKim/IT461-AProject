import axios from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { User } from '../types';

const LOGIN_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.LOGIN}`;

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

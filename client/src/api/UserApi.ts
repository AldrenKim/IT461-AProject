import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { User } from '../types';

const USERS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.USERS}`;

export async function getUserByUsername(axios: AxiosStatic, username: string): Promise<User> {
  return (await axios.get(USERS_API_URL, { params: { username } })).data;
}

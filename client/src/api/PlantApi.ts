import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Plant } from '../types';

const PLANTS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.PLANTS}`;

export async function getPlants(axios: AxiosStatic, url?: string): Promise<BaseData<Plant>> {
  return (await axios.get<BaseData<Plant>>(url || PLANTS_API_URL)).data;
}

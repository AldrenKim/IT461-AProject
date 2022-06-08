import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Animal } from '../types';

const PLANTS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.ANIMALS}?limit=3&offset=0`;

export async function getAnimals(axios: AxiosStatic, url?: string): Promise<BaseData<Animal>> {
  return (await axios.get<BaseData<Animal>>(url || PLANTS_API_URL)).data;
}

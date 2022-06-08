import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Animal } from '../types';

const ANIMALS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.ANIMALS}/?limit=3&offset=0`;

export async function getAnimals(axios: AxiosStatic, url?: string): Promise<BaseData<Animal>> {
  return (await axios.get<BaseData<Animal>>(url || ANIMALS_API_URL)).data;
}

export async function addAnimals(axios: AxiosStatic, data: Animal): Promise<Animal> {
  return (
    await axios.post(ANIMALS_API_URL, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
}

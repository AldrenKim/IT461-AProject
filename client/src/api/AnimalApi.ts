import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL, TABLE_ITEMS_COUNT } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Animal } from '../types';

const ANIMALS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.ANIMALS}`;

export async function getAnimals(axios: AxiosStatic, url?: string): Promise<BaseData<Animal>> {
  return (
    await axios.get<BaseData<Animal>>(
      url || `${ANIMALS_API_URL}/?limit=${TABLE_ITEMS_COUNT}&offset=0`,
    )
  ).data;
}
export async function getAnimal(axios: AxiosStatic, id: string): Promise<Animal> {
  return (await axios.get<Animal>(`${ANIMALS_API_URL}/${id}`)).data;
}

export async function editAnimal(axios: AxiosStatic, data: Animal): Promise<Animal> {
  return (
    await axios.put(`${ANIMALS_API_URL}/${data.id}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
}

export async function addAnimal(axios: AxiosStatic, data: Animal): Promise<Animal> {
  return (
    await axios.post(`${ANIMALS_API_URL}/`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
}
export async function deleteAnimal(axios: AxiosStatic, id: string): Promise<Animal> {
  return (await axios.delete<Animal>(`${ANIMALS_API_URL}/${id}`)).data;
}

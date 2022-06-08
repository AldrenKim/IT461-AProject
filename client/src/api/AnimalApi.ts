import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Animal } from '../types';

const ANIMALS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.ANIMALS}`;

export async function getAnimals(axios: AxiosStatic, url?: string): Promise<BaseData<Animal>> {
  return (await axios.get<BaseData<Animal>>(url || `${ANIMALS_API_URL}?limit=3&offset=0`)).data;
}

export async function getAnimal(axios: AxiosStatic, id: string): Promise<Animal> {
  return (await axios.get<Animal>(`${ANIMALS_API_URL}/${id}`)).data;
}

export async function editAnimal(axios: AxiosStatic, data: Animal): Promise<Animal> {
  return (await axios.put<Animal>(`${ANIMALS_API_URL}/${JSON.stringify(data)}`)).data;
}

export async function addAnimal(axios: AxiosStatic, data: Animal): Promise<Animal> {
  return (await axios.post<Animal>(`${ANIMALS_API_URL}/${JSON.stringify(data)}`)).data;
}

export async function deleteAnimal(axios: AxiosStatic, id: string): Promise<Animal> {
  return (await axios.delete<Animal>(`${ANIMALS_API_URL}/${id}`)).data;
}

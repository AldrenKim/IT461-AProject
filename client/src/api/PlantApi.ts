import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL, TABLE_ITEMS_COUNT } from '../config';
import { ApiRoute } from '../enums';
import { BaseData, Plant } from '../types';

const PLANTS_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.PLANTS}`;

export async function getPlants(axios: AxiosStatic, url?: string): Promise<BaseData<Plant>> {
  return (
    await axios.get<BaseData<Plant>>(
      url || `${PLANTS_API_URL}/?limit=${TABLE_ITEMS_COUNT}&offset=0`,
    )
  ).data;
}

export async function getPlant(axios: AxiosStatic, id: string): Promise<Plant> {
  return (await axios.get<Plant>(`${PLANTS_API_URL}/${id}`)).data;
}

export async function editPlant(axios: AxiosStatic, data: Plant): Promise<Plant> {
  return (
    await axios.put(`${PLANTS_API_URL}/${data.id}`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
}

export async function addPlant(axios: AxiosStatic, data: Plant): Promise<Plant> {
  return (
    await axios.post(`${PLANTS_API_URL}/`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).data;
}

export async function deletePlant(axios: AxiosStatic, id: string): Promise<Plant> {
  return (await axios.delete<Plant>(`${PLANTS_API_URL}/${id}`)).data;
}

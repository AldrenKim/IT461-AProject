import { RcFile } from 'antd/lib/upload';
import { AxiosStatic } from 'axios';

import { API_VERSION, BASE_API_URL } from '../config';
import { ApiRoute } from '../enums';

const FILES_API_URL = `${BASE_API_URL}${API_VERSION}${ApiRoute.FILES}`;

export async function getFile(axios: AxiosStatic, filename: string): Promise<Blob> {
  const objectFile = (await axios.get(`${FILES_API_URL}/${filename}`)).data;

  return new Blob([objectFile], { type: 'text/plain' });
}

export async function uploadFile(axios: AxiosStatic, file: RcFile): Promise<any> {
  const formData = new FormData();
  formData.append('filename', file.name);
  formData.append('file', file);

  return axios.post(`${FILES_API_URL}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

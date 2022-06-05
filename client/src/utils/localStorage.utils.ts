import { DEFAULT_LOCAL_STORAGE_KEY } from '../config';

export function setLocalStorage(data: any, key = DEFAULT_LOCAL_STORAGE_KEY) {
  const stringKey = JSON.stringify(key);
  const stringData = JSON.stringify(data);

  localStorage.setItem(stringKey, stringData);
}

export function getLocalStorage<T>(key = DEFAULT_LOCAL_STORAGE_KEY) {
  const stringKey = JSON.stringify(key);
  const data = localStorage.getItem(stringKey);

  return JSON.parse(data || '{}') as T;
}

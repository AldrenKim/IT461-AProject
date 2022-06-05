import axios from 'axios';
import { useEffect } from 'react';

import useAuth from './useAuth';

export default function useAxios() {
  const { auth } = useAuth();

  useEffect(() => {
    if (auth) {
      const requestIntercept = axios.interceptors.request.use(
        (config) => {
          if (config?.url?.indexOf('token=') === -1) {
            config.url += config.url.indexOf('?') === -1 ? '?' : '&';
            config.url += 'token=' + auth?.accessToken;
          }

          return config;
        },
        (error) => Promise.reject(error),
      );

      return () => {
        axios.interceptors.request.eject(requestIntercept);
      };
    }
  }, [auth]);

  return { axios };
}

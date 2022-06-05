import { message } from 'antd';
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { authLogin } from './api';
import { AuthContext } from './contexts';
import { AuthorizedRoutes, UnauthorizedRoutes } from './routes';

import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import { User } from './types';
import { getLocalStorage, setLocalStorage } from './utils';

export default function App() {
  const [auth, setAuth] = useState<User>();
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = getLocalStorage<User>();

    setAuth(savedUser);
  }, []);

  async function login(username: string, password: string) {
    setIsAuthenticating(true);

    const user = await authLogin(username, password);

    if (user?.accessToken) {
      setAuth(user);
      setLocalStorage(user);
      message.success('Logged In');
    } else {
      message.error('Error logging in');
    }

    setIsAuthenticating(false);
  }

  async function logout() {
    setIsAuthenticating(true);
    setAuth(undefined);
    setLocalStorage(null);
    setIsAuthenticating(false);
  }

  const routesDisplay = auth?.accessToken ? <AuthorizedRoutes /> : <UnauthorizedRoutes />;

  return (
    <AuthContext.Provider value={{ auth, isAuthenticating, login, logout }}>
      <BrowserRouter>{routesDisplay}</BrowserRouter>
    </AuthContext.Provider>
  );
}

import { createContext } from 'react';

import { User } from '../types';

type Context = {
  auth?: User;
  isAuthenticating: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<Context>({} as Context);

export default AuthContext;

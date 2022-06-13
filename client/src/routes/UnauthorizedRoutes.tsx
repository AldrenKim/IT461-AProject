import React, { useEffect } from 'react';
import { Route as PageRouter, Switch, useHistory } from 'react-router-dom';

import { Route } from '../enums';
import { useAuth } from '../hooks';
import { Login, PageNotFound, Register } from '../pages';

export default function UnauthorizedRoutes() {
  const { auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!auth?.accessToken && history.location.pathname === Route.HOME) {
      history.replace(Route.LOGIN);
    }
  }, [auth, history]);

  return (
    <Switch>
      <PageRouter exact component={Login} path={Route.LOGIN} />
      <PageRouter exact component={Register} path={Route.REGISTER} />
      <PageRouter component={PageNotFound} />
    </Switch>
  );
}

import React, { useEffect } from 'react';
import { Route as PageRouter, Switch, useHistory } from 'react-router-dom';

import { Route } from '../enums';
import { useAuth } from '../hooks';
import { Home, PageNotFound, PlantView, AnimalView } from '../pages';

export default function AuthorizedRoutes() {
  const { auth } = useAuth();
  const history = useHistory();

  useEffect(() => {
    if (!auth?.accessToken) {
      history.replace(Route.LOGIN);

      return;
    }

    if (history.location.pathname === Route.LOGIN) {
      history.replace(Route.HOME);
    }
  }, [auth, history]);

  return (
    <Switch>
      <PageRouter exact component={Home} path={Route.HOME} />
      <PageRouter exact component={PlantView} path={Route.PLANTS} />
      <PageRouter exact component={AnimalView} path={Route.ANIMALS} />
      <PageRouter component={PageNotFound} />
    </Switch>
  );
}

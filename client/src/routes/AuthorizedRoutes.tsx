import React, { useEffect } from 'react';
import { Route as PageRouter, Switch, useHistory } from 'react-router-dom';

import { Route } from '../enums';
import { useAuth } from '../hooks';
import { Home, PageNotFound, AnimalsTable, PlantsTable, CreateRecordView } from '../pages';

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
      <PageRouter exact component={PlantsTable} path={Route.PLANTS} />
      <PageRouter exact component={Home} path={Route.PLANTS_DELETE} />
      <PageRouter exact component={Home} path={Route.PLANTS_EDIT} />
      <PageRouter exact component={Home} path={Route.PLANTS_VIEW} />
      <PageRouter exact component={AnimalsTable} path={Route.ANIMALS} />
      <PageRouter exact component={Home} path={Route.ANIMALS_DELETE} />
      <PageRouter exact component={Home} path={Route.ANIMALS_EDIT} />
      <PageRouter exact component={Home} path={Route.ANIMALS_VIEW} />
      <PageRouter exact component={CreateRecordView} path={Route.CREATE} />
      <PageRouter component={PageNotFound} />
    </Switch>
  );
}

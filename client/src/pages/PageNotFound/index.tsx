import { Button, Result } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Route } from '../../enums';
import { useAuth } from '../../hooks';

export default function PageNotFound() {
  const history = useHistory();
  const { auth } = useAuth();

  function handleGoHome() {
    history.replace(auth?.accessToken ? Route.HOME : Route.LOGIN);
  }

  return (
    <Result
      extra={
        <Button type="primary" onClick={handleGoHome}>
          Back Home
        </Button>
      }
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      title="404"
    />
  );
}

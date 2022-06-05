import { Button, Typography } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

import { Route } from '../../enums';
import { useAuth } from '../../hooks';

const { Title } = Typography;

import * as S from './styles';

export default function PageNotFound() {
  const history = useHistory();
  const { auth } = useAuth();

  function handleGoHome() {
    history.replace(auth?.accessToken ? Route.HOME : Route.LOGIN);
  }

  return (
    <S.Container>
      <S.Content>
        <Title>Page Not Found</Title>
        <Button onClick={handleGoHome}>Go Home</Button>
      </S.Content>
    </S.Container>
  );
}

import { LoadingOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import React, { useContext } from 'react';

import { AuthContext } from '../../contexts';

const { Header, Footer, Sider, Content } = Layout;

export default function Login() {
  const { isAuthenticating, login } = useContext(AuthContext);

  async function handleClick() {
    await login('admin', 'admin');
  }

  const buttonDisplay = isAuthenticating ? <LoadingOutlined /> : 'Login';

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider>Sider</Sider>
        <Content>
          <Button size="large" onClick={handleClick}>
            {buttonDisplay}
          </Button>
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
}

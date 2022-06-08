import { LoadingOutlined } from '@ant-design/icons';
import { Button, Layout, Row, Col, Form, Input } from 'antd';

import React, { useContext } from 'react';

import background from '../../assets/bg.png';
import './login.css';
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
      <Layout>
        <Content style={{ backgroundColor: '#FCF6E4', height: '100vh' }}>
          <Row style={{ height: '100vh' }}>
            <Col
              span={12}
              style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover' }}
            >
              col-12
            </Col>
            <Col className="center" span={12}>
              <div style={{ marginLeft: '3em' }}>
                <div style={{ paddingBottom: '2.5em' }}>
                  <p className="login-head">Login</p>
                  <p className="login-sub-head">
                    Welcome to the Parm. Please enter your credentials below
                  </p>
                </div>
                <Form
                  labelCol={{ span: 8 }}
                  layout="vertical"
                  size="large"
                  style={{ fontWeight: 'bold' }}
                  wrapperCol={{ span: 16 }}
                >
                  <Form.Item label="Username" name="username" style={{ marginBottom: '0' }}>
                    <Input />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input />
                  </Form.Item>
                </Form>
                <Button size="large" style={{ backgroundColor: '#A6E3A1' }} onClick={handleClick}>
                  {buttonDisplay}
                </Button>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

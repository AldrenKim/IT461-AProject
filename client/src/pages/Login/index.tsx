import { LoadingOutlined } from '@ant-design/icons';
import { Button, Layout, Row, Col, Form, Input } from 'antd';

import React from 'react';

import background from '../../assets/bg.png';
import { useAuth } from '../../hooks';

const { Content } = Layout;

export default function Login() {
  const { isAuthenticating, login } = useAuth();

  async function handleClick(values: { password: string; username: string }) {
    await login(values.username, values.password);
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
                  <p className="head">Login</p>
                  <p className="sub-head login-sub-head">
                    Welcome to the Parm. Please enter your credentials below
                  </p>
                </div>
                <Form
                  labelCol={{ span: 8 }}
                  layout="vertical"
                  size="large"
                  style={{ fontWeight: 'bold' }}
                  wrapperCol={{ span: 16 }}
                  onFinish={handleClick}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" size="large" style={{ backgroundColor: '#A6E3A1' }}>
                      {buttonDisplay}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

import { Button, Layout, Row, Col, Form, Input, message } from 'antd';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { authRegister } from '../../api';

import background from '../../assets/bg.png';
import { Route } from '../../enums';

const { Content } = Layout;

export default function Register() {
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [form] = Form.useForm();

  function returnToLogin() {
    history.goBack();
  }

  const loadDefault = () => {
    form.setFieldsValue({ type: 'Farmer' });
  };

  const onFinish = async (values: any) => {
    try {
      setIsSaving(true);
      await authRegister(values.username, values.password, values.email);
      message.success({
        content: `Successfully added ${values.username}!`,
        duration: 1,
        onClose: returnToLogin,
      });
    } catch (err: any) {
      message.error(err?.message);
    } finally {
      setIsSaving(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: `Failed to add. There are items in your request that are invalid. ${errorInfo}`,
      duration: 1.5,
    });
  };

  async function handleGotoLogin() {
    history.push(Route.LOGIN);
  }

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
                  <p className="head">Sign Up</p>
                  <p className="sub-head login-sub-head">
                    Welcome to the Parm. Please enter your credentials below
                  </p>
                </div>
                <Form
                  form={form}
                  labelCol={{ span: 8 }}
                  layout="vertical"
                  size="large"
                  style={{ fontWeight: 'bold' }}
                  wrapperCol={{ span: 16 }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input onChange={loadDefault} />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input type="password" />
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      disabled={isSaving}
                      htmlType="submit"
                      size="large"
                      style={{ backgroundColor: '#A6E3A1' }}
                    >
                      {isSaving ? 'Submitting' : 'Submit'}
                    </Button>
                  </Form.Item>
                </Form>
              </div>
              <hr style={{ width: 650 }}></hr>
              <p style={{ textAlign: 'center' }}>
                Already have an account?
                <Button style={{ color: '#23EF12' }} type="link" onClick={handleGotoLogin}>
                  Sign in
                </Button>
              </p>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

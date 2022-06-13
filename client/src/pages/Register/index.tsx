import { LoadingOutlined } from '@ant-design/icons';
import { Button, Layout, Row, Col, Form, Input, message } from 'antd';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { addUser } from '../../api/UserApi';

import background from '../../assets/bg.png';
import { Route, UserType } from '../../enums';
import { useAxios } from '../../hooks';
import { User } from '../../types';

const { Header, Footer, Sider, Content } = Layout;

export default function Register() {
  const { axios } = useAxios();
  const history = useHistory();
  const [isSaving, setIsSaving] = useState(false);
  const [numberQuery, setNumberQuery] = useState('');
  const [typeOfItem, setTypeOfItem] = useState('');

  function returnToLogin() {
    history.goBack();
  }
  const onFinish = async (values: any) => {
    try {
      setIsSaving(true);
      const response = await addUser(axios, values);
      console.log(response);
      message.success({
        content: `Successfully added ${typeOfItem}!`,
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
                    <Input
                      onChange={(e) => {
                        setNumberQuery(e.currentTarget.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input
                      type="password"
                      onChange={(e) => {
                        setNumberQuery(e.currentTarget.value);
                      }}
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                    <Input
                    // onChange={(e) => {
                    //   setNumberQuery(e.currentTarget.value);
                    // }}
                    />
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
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
}

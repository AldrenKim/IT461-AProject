import { CaretLeftOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { addAnimal } from '../../../api/AnimalApi';

import { useAxios } from '../../../hooks';

const { Header, Footer, Sider, Content } = Layout;
const menuItems = [
  {
    icon: <CaretLeftOutlined />,
    key: 'Back',
    label: 'Back',
  },
];

export default function View() {
  const { axios } = useAxios();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [typeOfItem, setTypeOfItem] = useState('');
  const [dateToday, setDateToday] = useState('');
  const [form] = Form.useForm();

  const DateToday = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDateToday(date);
  };

  const loadDefault = () => {
    form.setFieldsValue({ date_updated: dateToday });
  };

  useEffect(() => {
    setTypeOfItem(id);
    DateToday();
  }, []);

  const onClick: MenuProps['onClick'] = () => {
    history.goBack();
  };

  const onFinish = async (values: any) => {
    const fetchedData = await addAnimal(axios, values);
    console.log(fetchedData);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (values: any) => {
    console.log('Click failed', values);
  };

  return (
    <>
      <Layout>
        <Header>
          <Menu items={menuItems} mode="horizontal" theme="dark" onClick={onClick}></Menu>
        </Header>
        <Content style={{ height: '100%' }}>
          <div>
            <Form
              autoComplete="off"
              form={form}
              initialValues={{ remember: true }}
              labelCol={{ span: 12 }}
              name="AddItem"
              size="middle"
              wrapperCol={{ span: 20 }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item label="ID" name="id">
                <Input />
              </Form.Item>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
              <Form.Item
                label="Scientific Name"
                name="scientific_name"
                rules={[{ required: true }]}
              >
                <Input onChange={loadDefault} />
              </Form.Item>
              <Form.Item
                label="Date Updated"
                name="date_updated"
                rules={[{ required: true }]}
                style={{ display: 'none' }}
              >
                <Input disabled={true} />
              </Form.Item>
              <Form.Item label="Filename" name="filename">
                <Input />
              </Form.Item>
              {typeOfItem === 'Animals' ? (
                <Form.Item
                  label="Count"
                  name="count"
                  rules={typeOfItem === 'Animals' ? [{ required: true }] : [{}]}
                  style={typeOfItem !== 'Animals' ? { display: 'none' } : {}}
                >
                  <Input />
                </Form.Item>
              ) : (
                <Form.Item
                  label="Area"
                  name="area"
                  rules={typeOfItem === 'Plants' ? [{ required: true }] : [{}]}
                  style={typeOfItem !== 'Plants' ? { display: 'none' } : {}}
                >
                  <Input />
                </Form.Item>
              )}
              <Form.Item>
                <Button htmlType="submit" type="primary">
                  Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </>
  );
}

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, Form, Input, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { addAnimal } from '../../api/AnimalApi';
import { addPlant } from '../../api/PlantApi';
import background from '../../assets/bg.png';
import { useAxios } from '../../hooks';
const { Content } = Layout;
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

  function handleGoBack() {
    history.goBack();
  }

  function returnTables() {
    history.goBack();
  }

  const onFinish = async (values: any) => {
    let fetchedData;
    if (typeOfItem === 'Animals') {
      fetchedData = await addAnimal(axios, values);
    } else {
      fetchedData = await addPlant(axios, values);
    }
    message.success({
      content: `Successfully added ${typeOfItem}!`,
      duration: 1,
      onClose: returnTables,
    });
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: 'Failed to add. There are items in your request that are invalid.',
      duration: 1.5,
    });
  };

  return (
    <>
      <div style={{ backgroundImage: `url(${background})`, height: '100vh' }}>
        <Button
          icon={<ArrowLeftOutlined />}
          style={{
            backgroundColor: '#A6E3A1',
            fontWeight: 'bold',
            margin: '2em 1em 0 1em',
          }}
          onClick={handleGoBack}
        >
          Back
        </Button>
        <Content>
          <div
            className="center"
            style={{ background: '#FCF6E4', borderRadius: '10%', marginTop: '3rem', width: '40%' }}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                margin: '.5rem 0',
                textAlign: 'center',
              }}
            >
              Create {typeOfItem === 'Animals' ? 'Animal' : 'Plant'}
            </h2>
            <Form
              autoComplete="off"
              form={form}
              initialValues={{ remember: true }}
              labelCol={{ span: 8 }}
              layout="vertical"
              name="AddItem"
              size="middle"
              style={{ fontWeight: 'bold' }}
              wrapperCol={{ span: 24 }}
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
              <Form.Item className="buttons">
                <Space>
                  <Button htmlType="submit" style={{ backgroundColor: '#A6E3A1' }}>
                    Submit
                  </Button>

                  <Button htmlType="button" onClick={onReset}>
                    Reset
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </div>
    </>
  );
}

import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Form, Input, Space, message, UploadProps, Upload } from 'antd';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { uploadFile } from '../../api';

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
  const [numberQuery, setNumberQuery] = useState('');
  const [uploadedFile, setUploadedFile] = useState<UploadFile>();
  const [isSaving, setIsSaving] = useState(false);
  const [form] = Form.useForm();
  const timeOutTms = 500;

  const props: UploadProps = {
    beforeUpload: (file) => {
      const isOBJ = file.name.split('.')[1] === 'obj';
      if (!isOBJ) {
        message.error(`${file.name} is not an obj file`);
      } else {
        setUploadedFile(file);
      }

      return false;
    },
    fileList: uploadedFile ? [uploadedFile] : [],
    onRemove: () => {
      setUploadedFile(undefined);
    },
  };

  const DateToday = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    setDateToday(date);
  };

  function checkNumber(val: string) {
    const re = /^[0-9.\b]+$/;
    if (val !== '' && !re.test(val)) {
      message.error({
        content: 'Invalid input. Must be integer.',
        duration: 2,
      });
    }
  }

  const loadDefault = () => {
    form.setFieldsValue({ date_updated: dateToday });
  };

  useEffect(() => {
    const timeOutId = setTimeout(() => checkNumber(numberQuery), timeOutTms);
    setTypeOfItem(id);
    DateToday();

    return () => clearTimeout(timeOutId);
  }, [id, numberQuery]);

  function handleGoBack() {
    history.goBack();
  }

  function returnTables() {
    history.goBack();
  }

  const onFinish = async (values: any) => {
    setIsSaving(true);
    let filename = null;

    try {
      if (uploadedFile) {
        await uploadFile(axios, uploadedFile as RcFile);
        filename = uploadedFile.name;
      }

      if (typeOfItem === 'Animals') {
        await addAnimal(axios, { ...values, filename });
      } else {
        await addPlant(axios, { ...values, filename });
      }

      message.success({
        content: `Successfully added ${typeOfItem}!`,
        duration: 1,
        onClose: returnTables,
      });
      setUploadedFile(undefined);
    } catch (err: any) {
      if (err?.message.includes('400')) {
        message.error('Ensure file format is .obj');
      } else {
        message.error(err?.message);
      }
    } finally {
      setIsSaving(false);
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: `Failed to add. There are items in your request that are invalid. ${errorInfo}`,
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
              <Form.Item label="3d .obj File" name="filename">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
              {typeOfItem === 'Animals' ? (
                <Form.Item label="Count" name="count" rules={[{ required: true }]}>
                  <Input
                    onChange={(e) => {
                      setNumberQuery(e.currentTarget.value);
                    }}
                  />
                </Form.Item>
              ) : (
                <Form.Item label="Area" name="area" rules={[{ required: true }]}>
                  <Input
                    min="1"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setNumberQuery(e.currentTarget.value);
                    }}
                  />
                </Form.Item>
              )}
              <Form.Item className="buttons">
                <Space>
                  <Button
                    disabled={isSaving}
                    htmlType="submit"
                    style={{ backgroundColor: '#A6E3A1' }}
                  >
                    {isSaving ? 'Submitting' : 'Submit'}
                  </Button>

                  <Button disabled={isSaving} htmlType="button" onClick={onReset}>
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

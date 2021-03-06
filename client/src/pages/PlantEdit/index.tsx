import { ArrowLeftOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Form, Input, Space, message, UploadProps, Upload } from 'antd';
import { UploadFile, RcFile } from 'antd/lib/upload/interface';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { uploadFile } from '../../api';

import { editPlant, getPlant } from '../../api/PlantApi';
import background from '../../assets/bg.png';
import { useAxios } from '../../hooks';
import { Plant } from '../../types';

const { Content } = Layout;

export default function PlantEdit() {
  const { axios } = useAxios();
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const [numberQuery, setNumberQuery] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [form] = Form.useForm();
  const [plant, setPlant] = useState<Plant>();
  const timeOutTms = 500;

  const props: UploadProps = {
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
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

  useEffect(() => {
    const timeOutId = setTimeout(() => checkNumber(numberQuery), timeOutTms);

    return () => clearTimeout(timeOutId);
  }, [id, numberQuery]);

  useEffect(() => {
    async function mount() {
      const fetchPlant = await getPlant(axios, id);
      setPlant(fetchPlant);
      form.resetFields();
    }
    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  function handleGoBack() {
    history.goBack();
  }

  function returnTables() {
    history.goBack();
  }

  const onFinish = async (values: Plant) => {
    setIsSaving(true);

    try {
      let filename = values.filename || null;

      if (fileList[0]) {
        await uploadFile(axios, fileList[0] as RcFile);
        filename = fileList[0].name;
      }

      await editPlant(axios, {
        ...values,
        date_updated: new Date(),
        filename,
        id,
      } as Plant);

      message.success({
        content: 'Successfully edited plant!',
        duration: 1,
        onClose: returnTables,
      });
      setFileList([]);
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

  const onFinishFailed = (errorInfo: any) => {
    message.error({
      content: `Failed to add. There are items in your request that are invalid. ${errorInfo}`,
      duration: 1.5,
    });
  };

  const handleOnChange = (e: any) => {
    const fname = e.target.name;
    const fvalue = e.target.value;
    form.setFieldsValue({
      [fname]: fvalue,
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
              Edit Plant
            </h2>
            <Form
              autoComplete="off"
              form={form}
              initialValues={plant}
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
                <Input onChange={handleOnChange} />
              </Form.Item>
              <Form.Item label="Scientific Name" rules={[{ required: true }]}>
                <Form.Item name="scientific_name">
                  <Input onChange={handleOnChange} />
                </Form.Item>
              </Form.Item>
              <Form.Item label="3d .obj File" name="filename">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <p>{plant?.filename}</p>
              </Form.Item>
              <Form.Item label="Area" name="area" rules={[{ required: true }]}>
                <Form.Item name="area">
                  <Input
                    min="1"
                    style={{ width: '100%' }}
                    onChange={(e) => {
                      setNumberQuery(e.currentTarget.value);
                      handleOnChange(e);
                    }}
                  />
                </Form.Item>
              </Form.Item>
              <Form.Item className="buttons">
                <Space>
                  <Button
                    disabled={isSaving}
                    htmlType="submit"
                    style={{ backgroundColor: '#A6E3A1' }}
                  >
                    {isSaving ? 'Submitting' : 'Submit'}
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

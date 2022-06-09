import { UploadOutlined } from '@ant-design/icons';
import { Button, Layout, Space, message } from 'antd';
import Upload, { UploadProps } from 'antd/lib/upload/Upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getFile, uploadFile } from '../../api';
import background from '../../assets/bg.png';
import { AuthContext } from '../../contexts';
import { Route } from '../../enums';
import { useAxios } from '../../hooks';
import logo from '../../logo.svg';
import { downloadBlob } from '../../utils';

export default function Home() {
  const { axios } = useAxios();
  const { logout } = useContext(AuthContext);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const history = useHistory();

  const handleUpload = () => {
    uploadFile(axios, fileList[0] as RcFile)
      .then(() => {
        setFileList([]);
        message.success('upload successfully.');
      })
      .catch((err) => {
        message.error(err?.message);
      })
      .finally(() => {
        setUploading(false);
      });
  };

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

  async function handleGoToPlants() {
    history.push(Route.PLANTS);
  }

  async function handleGoToAnimals() {
    history.push(Route.ANIMALS);
  }

  return (
    <Layout>
      <div style={{ backgroundImage: `url(${background})`, height: '100vh' }}>
        {/* <button onClick={show}>show</button> */}
        <div className="home-center">
          <Space align="center" direction="vertical" size="middle">
            <Button
              size="large"
              style={{
                backgroundColor: '#A6E3A1',
                fontSize: '32px',
                height: 'auto',
                margin: 'auto',
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
              type="dashed"
              onClick={handleGoToAnimals}
            >
              View Animals
            </Button>
            <Button
              size="large"
              style={{
                backgroundColor: '#A6E3A1',
                fontSize: '32px',
                height: 'auto',
                margin: '2rem',
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
              type="dashed"
              onClick={handleGoToPlants}
            >
              View Plants
            </Button>
            <Button
              size="large"
              style={{
                backgroundColor: '#A6E3A1',
                fontSize: '32px',
                height: 'auto',
                margin: 'auto',
                paddingLeft: '2rem',
                paddingRight: '2rem',
              }}
              onClick={logout}
            >
              Logout
            </Button>
            {/* <h1>File Upload</h1>
                <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
                <Button
                  disabled={fileList.length === 0}
                  loading={uploading}
                  style={{ marginTop: 16 }}
                  type="primary"
                  onClick={handleUpload}
                >
                  {uploading ? 'Uploading' : 'Start Upload'}
                </Button> */}
          </Space>
        </div>
      </div>
    </Layout>
  );
}

import { UploadOutlined } from '@ant-design/icons';
import { Button, Layout, message } from 'antd';
import Upload, { UploadProps } from 'antd/lib/upload/Upload';
import { RcFile, UploadFile } from 'antd/lib/upload/interface';
import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { getFile, uploadFile } from '../../api';
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

  async function show() {
    const blob = await getFile(axios, 'leaf.obj');
    downloadBlob(blob);
  }

  async function handleGoToPlants() {
    history.push(Route.PLANTS);
  }

  async function handleGoToAnimals() {
    history.push(Route.ANIMALS);
  }

  async function handleGoToTestDelete() {
    history.push(Route.TESTDELETE);
  }

  return (
    <Layout>
      <div className="App">
        <header className="App-header">
          <img alt="logo" className="App-logo" src={logo} />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn React
          </a>
          <button onClick={show}>show</button>
          <Button size="large" type="dashed" onClick={handleGoToPlants}>
            Plants
          </Button>
          <Button size="large" type="dashed" onClick={handleGoToAnimals}>
            Animals
          </Button>
          <Button onClick={handleGoToTestDelete}>Delete Test</Button>
          <Button size="large" onClick={logout}>
            Logout
          </Button>
        </header>
        <h1>File Upload</h1>
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
        </Button>
      </div>
    </Layout>
  );
}

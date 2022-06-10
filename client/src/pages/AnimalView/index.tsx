import { ArrowLeftOutlined } from '@ant-design/icons';
import { Col, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import { getFile, getAnimal } from '../../api';
import background from '../../assets/bg.png';
import { ThreeDViewer } from '../../components';
import { useAxios } from '../../hooks';
import { Animal } from '../../types';

export default function AnimalView() {
  const { id } = useParams<{ id: string }>();
  const { axios } = useAxios();
  const history = useHistory();
  const [animal, setAnimal] = useState<Animal>();
  const [object, setObject] = useState<Blob>();

  function handleGoBack() {
    history.goBack();
  }

  useEffect(() => {
    async function mount() {
      const fetchedAnimal = await getAnimal(axios, id);
      setAnimal(fetchedAnimal);

      if (fetchedAnimal.filename) {
        const blob = await getFile(axios, fetchedAnimal.filename);
        setObject(blob);
      }
    }

    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row
      style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover', height: '100vh' }}
    >
      <Col span={16}>
        <ThreeDViewer obj={object} />
      </Col>
      <Col className="center" span={8}>
        <div style={{ background: '#FCF6E4', margin: '0 1.5em', padding: '1em' }}>
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
          <div style={{ paddingBottom: '2.5em' }}>
            <p className="head">{plant?.name}</p>
            <p className="view-sub-head sub-head">{plant?.scientific_name}</p>
            <div className="view-content">
              <p style={{ margin: '.5em 0' }}>
                <strong>Area</strong>: {plant?.area}
              </p>
              <p style={{ margin: '.5em 0' }}>
                <strong>Date Added</strong>: {plant?.date_updated}
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

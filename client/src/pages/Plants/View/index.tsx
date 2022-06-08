import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getFile, getPlant } from '../../../api';
// import { ThreeDViewer } from '../../../components';
import { useAxios } from '../../../hooks';
import { Plant } from '../../../types';

export default function PlantView() {
  const { id } = useParams<{ id: string }>();
  const { axios } = useAxios();
  const [plant, setPlant] = useState<Plant>();
  const [object, setObject] = useState<Blob>();

  useEffect(() => {
    async function mount() {
      const fetchedPlant = await getPlant(axios, id);
      setPlant(fetchedPlant);

      if (fetchedPlant.filename) {
        const blob = await getFile(axios, fetchedPlant.filename);
        setObject(blob);
      }
    }

    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Row>
      <div style={{ height: '100vh', width: '70vw' }}>{/* <ThreeDViewer obj={object} /> */}</div>
      <div>{plant?.name}</div>
    </Row>
  );
}

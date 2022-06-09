import { Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getFile, getAnimal } from '../../api';
import { ThreeDViewer } from '../../components';
import { useAxios } from '../../hooks';
import { Animal } from '../../types';

export default function AnimalView() {
  const { id } = useParams<{ id: string }>();
  const { axios } = useAxios();
  const [animal, setAnimal] = useState<Animal>();
  const [object, setObject] = useState<Blob>();

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
    <Row>
      <div style={{ height: '100vh', width: '70vw' }}>
        <ThreeDViewer obj={object} />
      </div>
      <div>{animal?.name}</div>
      <div>{animal?.scientific_name}</div>
      <div>{animal?.count}</div>
    </Row>
  );
}

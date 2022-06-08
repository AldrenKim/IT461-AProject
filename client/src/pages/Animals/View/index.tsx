import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getAnimals } from '../../../api/AnimalApi';
import { useAxios } from '../../../hooks';

import { Animal } from '../../../types';

const COLUMNS: ColumnsType<Animal> = [
  {
    dataIndex: 'id',
    key: 'id',
    title: 'Id',
  },
  {
    dataIndex: 'name',
    key: 'name',
    title: 'Name',
  },
  {
    dataIndex: 'scientific_name',
    key: 'scientific_name',
    title: 'Scientific Name',
  },
  {
    dataIndex: 'count',
    key: 'count',
    title: 'Count',
  },
  {
    dataIndex: 'date_updated',
    key: 'date_updated',
    title: 'Date Last Updated',
  },
];

export default function View() {
  const { axios } = useAxios();
  const history = useHistory();
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    async function mount() {
      const fetchedData = await getAnimals(axios);

      setAnimals(fetchedData.data);
    }

    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGoBack() {
    history.goBack();
  }

  return (
    <>
      <Button onClick={handleGoBack}>Back</Button>
      <Table columns={COLUMNS} dataSource={animals} />
    </>
  );
}

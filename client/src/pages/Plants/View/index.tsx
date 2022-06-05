import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPlants } from '../../../api/PlantApi';
import { useAxios } from '../../../hooks';

import { Plant } from '../../../types';

const COLUMNS: ColumnsType<Plant> = [
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
    dataIndex: 'area',
    key: 'area',
    title: 'Area',
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
  const [plants, setPlants] = useState<Plant[]>([]);

  useEffect(() => {
    async function mount() {
      const fetchedData = await getPlants(axios);

      setPlants(fetchedData.data);
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
      <Table columns={COLUMNS} dataSource={plants} />
    </>
  );
}

import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPlants } from '../../../api/PlantApi';
import { Route } from '../../../enums';
import { useAxios } from '../../../hooks';

import { Plant } from '../../../types';

export default function PlantsTable() {
  const { axios } = useAxios();
  const history = useHistory();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    async function mount() {
      const fetchedData = await getPlants(axios);

      setPlants(fetchedData.data);
      setNext(fetchedData.metadata.links.next);
      setPrev(fetchedData.metadata.links.prev);
    }

    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGoBack() {
    history.goBack();
  }

  function handelAddNewItem() {
    history.push(Route.HOME);
  }

  async function handleNext() {
    const fetchedData = await getPlants(axios, next || '');
    console.log(fetchedData);

    setPlants(fetchedData.data);
    setNext(fetchedData.metadata.links.next);
    setPrev(fetchedData.metadata.links.prev);
  }

  async function handlePrev() {
    const fetchedData = await getPlants(axios, prev || '');

    setPlants(fetchedData.data);
    setNext(fetchedData.metadata.links.next);
    setPrev(fetchedData.metadata.links.prev);
  }

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
    {
      key: 'action',
      render: (_, record) => {
        function handleView() {
          history.push(Route.PLANTS_VIEW.replace(':id', record.id));
        }

        function handleEdit() {
          history.push(Route.PLANTS_EDIT.replace(':id', record.id));
        }

        function handleDelete() {
          history.push(Route.PLANTS_DELETE.replace(':id', record.id));
        }

        return (
          <Space size="middle">
            <Button style={{ color: '#23EF12' }} type="link" onClick={handleView}>
              View
            </Button>
            <Button type="link" onClick={handleEdit}>
              Edit
            </Button>
            <Button danger type="link" onClick={handleDelete}>
              Delete
            </Button>
          </Space>
        );
      },
      title: 'Action',
    },
  ];

  return (
    <>
      <Button onClick={handleGoBack}>Back</Button>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={handelAddNewItem}>Add New Item</Button>
      </div>
      <Table columns={COLUMNS} dataSource={plants} pagination={false} rowKey="name" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Space size="large">
          <Button disabled={!prev} onClick={handlePrev}>
            Prev
          </Button>
          <Button disabled={!next} onClick={handleNext}>
            Next
          </Button>
        </Space>
      </div>
    </>
  );
}

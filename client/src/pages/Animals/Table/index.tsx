import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getAnimals } from '../../../api/AnimalApi';
import { Route } from '../../../enums';
import { useAxios } from '../../../hooks';

import { Animal } from '../../../types';

export default function AnimalsTable() {
  const { axios } = useAxios();
  const history = useHistory();
  const [animals, setAnimals] = useState<Animal[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [prev, setPrev] = useState<string | null>(null);

  useEffect(() => {
    async function mount() {
      const fetchedData = await getAnimals(axios);

      setAnimals(fetchedData.data);
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
    const test = 'Animals';
    history.push(Route.CREATE.replace(':id', test));
  }

  async function handleNext() {
    const fetchedData = await getAnimals(axios, next || '');

    setAnimals(fetchedData.data);
    setNext(fetchedData.metadata.links.next);
    setPrev(fetchedData.metadata.links.prev);
  }

  async function handlePrev() {
    const fetchedData = await getAnimals(axios, prev || '');

    setAnimals(fetchedData.data);
    setNext(fetchedData.metadata.links.next);
    setPrev(fetchedData.metadata.links.prev);
  }

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
    {
      key: 'action',
      render: (_, record) => {
        function handleView() {
          history.push(Route.ANIMALS_VIEW.replace(':id', record.id));
        }

        function handleEdit() {
          history.push(Route.ANIMALS_EDIT.replace(':id', record.id));
        }

        function handleDelete() {
          history.push(Route.ANIMALS_DELETE.replace(':id', record.id));
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
      <Table columns={COLUMNS} dataSource={animals} pagination={false} rowKey="name" />
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

import { ArrowLeftOutlined } from '@ant-design/icons';
import { Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getPlants } from '../../api';
import background from '../../assets/bg-plants.png';
import { Route } from '../../enums';

import { useAxios } from '../../hooks';
import { Plant } from '../../types';

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
    history.push(Route.HOME);
  }

  function handelAddNewItem() {
    history.push(Route.CREATE.replace(':id', 'Plants'));
  }

  async function handleNext() {
    const fetchedData = await getPlants(axios, next || '');

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
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => parseInt(a.id) - parseInt(b.id),
      title: 'Id',
    },
    {
      dataIndex: 'name',
      key: 'name',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
      title: 'Name',
    },
    {
      dataIndex: 'scientific_name',
      key: 'scientific_name',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.scientific_name.localeCompare(b.scientific_name),
      title: 'Scientific Name',
    },
    {
      dataIndex: 'area',
      key: 'area',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.area - b.area,
      title: 'Area',
    },
    {
      dataIndex: 'date_updated',
      key: 'date_updated',
      render: (date: string) => new Date(date).toLocaleDateString(),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => new Date(a.date_updated).getTime() - new Date(b.date_updated).getTime(),
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
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: 'cover',
          height: '100vh',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1em' }}>
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

          <Button
            style={{
              backgroundColor: '#A6E3A1',
              fontWeight: 'bold',
              margin: '2em 1em 0 1em',
            }}
            onClick={handelAddNewItem}
          >
            Add New Item
          </Button>
        </div>
        <Table
          bordered
          columns={COLUMNS}
          dataSource={plants}
          pagination={false}
          rowKey="name"
          style={{ margin: '0 1em' }}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Space size="large">
            <Button
              disabled={!prev}
              style={{
                backgroundColor: '#A6E3A1',
                margin: '1em 1em 0 1em',
              }}
              onClick={handlePrev}
            >
              Prev
            </Button>
            <Button
              disabled={!next}
              style={{
                backgroundColor: '#A6E3A1',
                margin: '1em 1em 0 1em',
              }}
              onClick={handleNext}
            >
              Next
            </Button>
          </Space>
        </div>
      </div>
    </>
  );
}

import { Button, Layout, Space } from 'antd';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { deletePlant } from '../../api/PlantApi';
import background from '../../assets/bg.png';
import { Route } from '../../enums';
import { useAxios } from '../../hooks';

export default function PlantDelete() {
  const { axios } = useAxios();
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const history = useHistory();

  async function handleGoToPlants() {
    history.push(Route.PLANTS);
  }

  const handleYes = async () => {
    try {
      const response = await deletePlant(axios, id);
      console.log(response);
      handleGoToPlants();
    } catch (err) {
      alert(err); // eslint-disable-line no-alert
    }
  };

  // const handleNo = () => {
  //   handleGoToAnimals();
  // };

  return (
    <div style={{ backgroundImage: `url(${background})`, height: '100vh' }}>
      <div
        className="center delete-center "
        style={{ background: '#FCF6E4', borderRadius: '10%', width: '40%' }}
      >
        <Space align="center" direction="vertical" size="middle">
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              margin: '.5rem 0',
              textAlign: 'center',
            }}
          >
            Delete Item?
          </h2>
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
            onClick={handleYes}
          >
            Yes
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
            type="dashed"
            onClick={handleGoToPlants}
          >
            No
          </Button>
        </Space>
      </div>
    </div>
  );
}

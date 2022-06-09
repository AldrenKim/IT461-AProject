import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { deletePlant } from '../../api/PlantApi';
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
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <h1>delete animal???</h1>
      <button onClick={handleYes}>Yes</button>
      <button onClick={handleGoToPlants}>No</button>
    </div>
  );
}

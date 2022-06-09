import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { deleteAnimal } from '../../api/AnimalApi';
import { Route } from '../../enums';
import { useAxios } from '../../hooks';

export default function AnimalDelete() {
  const { axios } = useAxios();
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const history = useHistory();

  async function handleGoToAnimals() {
    history.push(Route.ANIMALS);
  }

  const handleYes = async () => {
    try {
      const response = await deleteAnimal(axios, id);
      console.log(response);
      handleGoToAnimals();
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
      <button onClick={handleGoToAnimals}>No</button>
    </div>
  );
}

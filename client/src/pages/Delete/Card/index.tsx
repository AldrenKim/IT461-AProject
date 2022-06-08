import React, { useRef, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { useAxios } from '../../../hooks';

export default function AnimalDelete() {
  const { axios } = useAxios();
  const location = useLocation();
  // const id = location.pathname.slice(location.pathname.length - 1);
  const { id } = useParams<{ id: string }>();

  // const errRef = useRef();
  // const [setErrMsg] = useState('');
  console.log(id);
  console.log(location);

  // useEffect(() => {
  console.log(location.pathname);
  // }, [location]);

  const handleYes = async () => {
    // try {
    //   const response = await axios.delete(`/animals/delete/${id}`);
    //   console.log(response);
    // } catch (err) {
    //   console.log(err);
    // }
    try {
      const response = await axios.delete(`/animals?ID=${id}`);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  // const handleNo = () => {};

  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }}>
      <h1>delete animal???</h1>
      <button onClick={handleYes}>Yes</button>
      <button>No</button>
    </div>
  );
}

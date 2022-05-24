import axios from 'axios';
import React, { useEffect, useState } from 'react';

import logo from './logo.svg';
import './App.css';

function App() {
  const [dogs, setDogs] = useState([]);

  async function show() {
    const params = JSON.stringify({
      password: 'admin',
      username: 'admin',
    });
    console.log((await axios.get('http://127.0.0.1:8000/')).data);
    const token = (
      await axios.post('http://127.0.0.1:8000/v1/login', params, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data.token;
    console.log(token);
    const d = await axios.get('http://127.0.0.1:8000/v1/dogs', {
      params: {
        token,
      },
    });
    console.log(d.data);
    setDogs(d.data.data.map((dog: any) => dog.name));
  }

  useEffect(() => {
    async function mount() {
      // setDogs(dogsData);
    }

    mount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img alt="logo" className="App-logo" src={logo} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          rel="noopener noreferrer"
          target="_blank"
        >
          Learn React
        </a>
        <button onClick={show}>show</button>
        {dogs.join(', ')}
      </header>
    </div>
  );
}

export default App;

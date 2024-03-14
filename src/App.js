import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cabType, setcabType] = useState('');
  const [email, setemail] = useState('');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/calculate', {
        source,
        destination,
        cabType,
        email
      });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Cab System</h1>
      <form onSubmit={handleSubmit}>
      <label>
          Email:
          <input type="text" value={email} onChange={(e) => setemail(e.target.value)} />
        </label>
        <label>
          CabType:
          <input type="text" value={cabType} onChange={(e) => setcabType(e.target.value)} />
        </label>
        <label>
          Source:
          <input type="text" value={source} onChange={(e) => setSource(e.target.value)} />
        </label>
        <br />
        <label>
          Destination:
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {result.shortestTime && (
        <div>
          <h2>Result:</h2>
          <p>Shortest Time: {result.shortestTime} minutes</p>
          <p>Estimated Cost: ${result.estimatedCost}</p>
        </div>
      )}
    </div>
  );
}

export default App;

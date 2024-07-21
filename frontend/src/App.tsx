import React, { useState } from 'react';
import GeneExpressionForm from './components/GeneExpressionForm';
import Results from './components/Results';
import axios from 'axios';

function App() {
  const [results, setResults] = useState(null);

  const handleDataSubmit = async (data: any) => {
    const response = await axios.post('/api/process', data);
    setResults(response.data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Gene Expression Analysis</h1>
      <GeneExpressionForm onSubmit={handleDataSubmit} />
      {results && <Results data={results} />}
    </div>
  );
}

export default App;

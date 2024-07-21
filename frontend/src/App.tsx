import React, { useState } from 'react';
import axios from 'axios';

import GeneExpressionForm from './components/GeneExpressionForm';
import Results from './components/Results';
import type { GeneExpressionEntry, ResultItem } from './types';

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

const App: React.FC = () => {
  const [results, setResults] = useState<ResultItem[]>();

  const handleDataSubmit = async (data: { data: GeneExpressionEntry[] }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/process`, data, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error submitting data", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Gene Expression Analysis</h1>
      <GeneExpressionForm onSubmit={handleDataSubmit} />
      {results && <Results data={results} />}
    </div>
  );
};

export default App;

import React from 'react';
import GeneExpressionForm from './components/GeneExpressionForm';
import Results from './components/Results';
import './index.css';
import type { GeneExpressionEntry } from './utils/types';
import { useGeneExpression } from './hooks/useGeneExpression';

const App: React.FC = () => {
  const { mutate, data, isPending, isError, error } = useGeneExpression();

  const handleDataSubmit = (formData: { data: GeneExpressionEntry[] }) => {
    mutate(formData);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Gene Expression Analysis</h1>

      {isError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <strong>Error:</strong> {error?.message || 'An error occurred'}
        </div>
      )}

      <GeneExpressionForm onSubmit={handleDataSubmit} isLoading={isPending} />

      {isPending && (
        <div className="flex items-center justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <span className="ml-3 text-gray-600">Processing data...</span>
        </div>
      )}

      {data && <Results data={{ data }} />}
    </div>
  );
};

export default App;

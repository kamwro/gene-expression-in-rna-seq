import React from 'react';
import type { ResultsProps } from '../types';

const Results: React.FC<ResultsProps> = ({ data }) => {
  // Check if data is an array or an object and render accordingly
  const renderResults = () => {
    if (Array.isArray(data)) {
      return (
        <ul>
          {data.map((item, index) => (
            <li key={index}>{JSON.stringify(item, null, 2)}</li>
          ))}
        </ul>
      );
    } else if (typeof data === 'object' && data !== null) {
      return <pre>{JSON.stringify(data, null, 2)}</pre>;
    } else {
      return <p>No results to display.</p>;
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Results</h2>
      {renderResults()}
    </div>
  );
};

export default Results;

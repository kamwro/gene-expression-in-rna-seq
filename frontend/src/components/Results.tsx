import React from 'react';

function Results({ data }: any) {
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Results</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default Results;

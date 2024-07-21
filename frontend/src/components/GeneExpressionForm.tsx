import React, { useState } from 'react';

function GeneExpressionForm({ onSubmit }: any) {
  const [data, setData] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const parsedData = JSON.parse(data);
    onSubmit(parsedData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className="w-full p-2 border"
        rows={10}
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit" className="mt-2 px-4 py-2 bg-blue-500 text-white">Analyze</button>
    </form>
  );
}

export default GeneExpressionForm;

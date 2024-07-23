import React from 'react';
import { saveAs } from 'file-saver';
import '../index.css';
import type { ResultsProps } from '../utils/types';

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

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
  const handleDownloadText = () => {
    const textData = JSON.stringify(data.data);

    // Create a Blob and save it as a text file
    const blob = new Blob([textData], { type: 'text/plain;charset=utf-8;' });
    saveAs(blob, 'results.txt');
  };

  const handleDownloadPDF = async () => {
    const response = await fetch(`${API_BASE_URL}/api/generate-pdf`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: data.data }),
    });
  
    if (!response.ok) {
      console.error('Failed to generate PDF');
      return;
    }
  
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'results.pdf';
    a.click();
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Results</h2>
      {renderResults()}
      <button
        onClick={handleDownloadText}
        className="bg-green-500 text-white px-4 py-2 mr-4"
      >
        Download txt
      </button>
      <button
        onClick={handleDownloadPDF}
        className="px-4 py-2 bg-green-600 text-white"
      >
        Download PDF
      </button>
    </div>
  );
};

export default Results;

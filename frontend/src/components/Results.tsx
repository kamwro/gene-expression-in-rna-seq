import React from 'react';
import { saveAs } from 'file-saver'; 
import '../index.css';
import type { ResultsProps } from '../utils/types';
import jsPDF from 'jspdf';

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

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    let height = 10;
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255);
    doc.text('Results', 10, height);

    const dataObject = data.data;

    // Generate text for PDF from object
    for (const [key, value] of Object.entries(dataObject)){
      height+=20;
      doc.setFontSize(15);
      doc.setTextColor(0, 0, 255);
      doc.text(key, 10, height);
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      height+=10;
      for (const [key2, value2] of Object.entries(value)){
        height+=10;
        const line = `${key2}: ${value2}`;
        doc.text(line, 10, height);
      }
    };

    // Save PDF
    doc.save('results.pdf');
  };
  
  return (
    <div className="mt-4">
      <h2 className="text-xl mb-2">Results</h2>
      {renderResults()}
      <button onClick={handleDownloadText} className="bg-green-500 text-white px-4 py-2 mr-4">
        Download txt
      </button>
      <button onClick={handleDownloadPDF} className="px-4 py-2 bg-green-600 text-white">Download PDF</button>
    </div>
  );
};

export default Results;

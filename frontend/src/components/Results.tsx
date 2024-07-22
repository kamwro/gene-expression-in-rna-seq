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
    let y = 10;
    const lineHeight = 10;
    const margin = 10;
    const pageHeight = doc.internal.pageSize.height;
  
    doc.setFontSize(20);
    doc.setTextColor(0, 0, 255);
    doc.text('Results', margin, y);
    y += lineHeight * 2;
  
    const dataObject = data.data;
  
    for (const [key, value] of Object.entries(dataObject)) {
      // Check if we need a new page before writing the key
      if (y + lineHeight * 2 > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }
      doc.setFontSize(15);
      doc.setTextColor(0, 0, 255);
      doc.text(key, margin, y);
      y += lineHeight;
  
      // Check if we need a new page before writing the values
      doc.setFontSize(10);
      doc.setTextColor(0, 0, 0);
      for (const [key2, value2] of Object.entries(value)) {
        if (y + lineHeight > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }
        const line = `${key2}: ${value2}`;
        doc.text(line, margin, y);
        y += lineHeight;
      }
      y += lineHeight; // Add space between sections
    }
  
    doc.save('results.pdf');
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

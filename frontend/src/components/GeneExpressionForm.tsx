import React, { useState } from 'react';
import '../index.css';
import type { GeneExpressionFormProps } from '../utils/types';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BASE_API_URL;

const GeneExpressionForm: React.FC<GeneExpressionFormProps> = ({
  onSubmit,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null); // Reset any previous errors when a new file is selected
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file) {
      if (isSubmitting) return;
      setIsSubmitting(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post(`${API_BASE_URL}/api/csv-to-json`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }});
        
        onSubmit(response.data);
      } catch (error) {
        console.error('Error parsing CSV file', error);
        setError(
          'Error parsing CSV file. Please check the file format and try again.'
        );
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setError('No file selected. Please choose a CSV file to upload.');
      console.error('No file selected');
    }
  };

  const handleDownloadSampleCSV = async () => {
    const response = await fetch(`${API_BASE_URL}/api/sample-csv`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'sample_data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".csv" onChange={handleFileChange} />

      <button
        type="submit"
        className="mr-10 mt-2 px-4 py-2 bg-blue-500 text-white"
      >
        {isSubmitting ? 'Submitting...' : 'Analyze'}
      </button>

      <button
        type="button"
        onClick={handleDownloadSampleCSV}
        className="mt-2 px-5 py-2 bg-blue-600 text-white"
      >
        Download Sample CSV
      </button>

      <p className="mt-2 text-gray-600">
        Upload a CSV file containing gene expression data. Ensure the file has
        columns for 'gene' and 'expression_level'.
      </p>

      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default GeneExpressionForm;
